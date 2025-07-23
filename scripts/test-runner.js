#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class TestRunner {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.results = {
      backend: { passed: 0, failed: 0, total: 0 },
      frontend: { passed: 0, failed: 0, total: 0 },
      e2e: { passed: 0, failed: 0, total: 0 },
      overall: { passed: 0, failed: 0, total: 0 }
    };
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m', // cyan
      success: '\x1b[32m', // green
      error: '\x1b[31m', // red
      warning: '\x1b[33m', // yellow
      reset: '\x1b[0m'
    };
    
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  async runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        cwd,
        stdio: 'pipe',
        shell: true
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          code,
          stdout,
          stderr
        });
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  parseJestResults(output) {
    const lines = output.split('\n');
    let passed = 0, failed = 0, total = 0;

    for (const line of lines) {
      if (line.includes('Tests:')) {
        const matches = line.match(/(\d+)\s+passed|(\d+)\s+failed|(\d+)\s+total/g);
        if (matches) {
          for (const match of matches) {
            if (match.includes('passed')) {
              passed = parseInt(match.match(/\d+/)[0]);
            } else if (match.includes('failed')) {
              failed = parseInt(match.match(/\d+/)[0]);
            } else if (match.includes('total')) {
              total = parseInt(match.match(/\d+/)[0]);
            }
          }
        }
        break;
      }
    }

    return { passed, failed, total };
  }

  async runBackendTests() {
    this.log('\n🧪 Running Backend Tests...', 'info');
    
    try {
      const backendPath = path.join(this.projectRoot, 'backend');
      
      // Check if node_modules exists, if not install dependencies
      if (!fs.existsSync(path.join(backendPath, 'node_modules'))) {
        this.log('Installing backend dependencies...', 'warning');
        await this.runCommand('npm', ['install'], backendPath);
      }

      // Install mongodb-memory-server if not present
      const result = await this.runCommand('npm', ['install', 'mongodb-memory-server', '--save-dev'], backendPath);
      
      // Run tests
      const testResult = await this.runCommand('npm', ['test'], backendPath);
      
      this.results.backend = this.parseJestResults(testResult.stdout + testResult.stderr);
      
      if (testResult.code === 0) {
        this.log('✅ Backend tests passed!', 'success');
      } else {
        this.log('❌ Backend tests failed!', 'error');
        this.log(testResult.stderr, 'error');
      }
      
      return testResult.code === 0;
    } catch (error) {
      this.log(`❌ Backend test error: ${error.message}`, 'error');
      return false;
    }
  }

  async runFrontendTests() {
    this.log('\n🎨 Running Frontend Tests...', 'info');
    
    try {
      const frontendPath = path.join(this.projectRoot, 'frontend');
      
      // Check if node_modules exists, if not install dependencies
      if (!fs.existsSync(path.join(frontendPath, 'node_modules'))) {
        this.log('Installing frontend dependencies...', 'warning');
        await this.runCommand('npm', ['install'], frontendPath);
      }

      // Run tests
      const testResult = await this.runCommand('npm', ['test', '--', '--watchAll=false', '--coverage'], frontendPath);
      
      this.results.frontend = this.parseJestResults(testResult.stdout + testResult.stderr);
      
      if (testResult.code === 0) {
        this.log('✅ Frontend tests passed!', 'success');
      } else {
        this.log('❌ Frontend tests failed!', 'error');
        // Don't log stderr for frontend as it might contain expected warnings
      }
      
      return testResult.code === 0;
    } catch (error) {
      this.log(`❌ Frontend test error: ${error.message}`, 'error');
      return false;
    }
  }

  async runE2ETests() {
    this.log('\n🌐 Running E2E Tests...', 'info');
    
    try {
      const e2ePath = path.join(this.projectRoot, 'tests', 'e2e');
      
      // Check if puppeteer is installed
      try {
        require('puppeteer');
      } catch (error) {
        this.log('Installing E2E test dependencies...', 'warning');
        await this.runCommand('npm', ['install', 'puppeteer', 'jest', '--save-dev'], this.projectRoot);
      }

      // Create jest config for e2e tests
      const jestConfig = {
        testMatch: ['**/tests/e2e/**/*.test.js'],
        setupFilesAfterEnv: ['<rootDir>/tests/e2e/setup.js'],
        testTimeout: 30000
      };

      fs.writeFileSync(
        path.join(this.projectRoot, 'jest.e2e.config.js'),
        `module.exports = ${JSON.stringify(jestConfig, null, 2)};`
      );

      // Run E2E tests
      const testResult = await this.runCommand('npx', ['jest', '--config=jest.e2e.config.js'], this.projectRoot);
      
      this.results.e2e = this.parseJestResults(testResult.stdout + testResult.stderr);
      
      if (testResult.code === 0) {
        this.log('✅ E2E tests passed!', 'success');
      } else {
        this.log('❌ E2E tests failed!', 'error');
        this.log('Note: E2E tests require the application to be running on localhost:3000', 'warning');
      }
      
      return testResult.code === 0;
    } catch (error) {
      this.log(`❌ E2E test error: ${error.message}`, 'error');
      return false;
    }
  }

  generateReport() {
    this.log('\n📊 Test Results Summary', 'info');
    this.log('=' .repeat(50), 'info');
    
    const categories = ['backend', 'frontend', 'e2e'];
    
    categories.forEach(category => {
      const result = this.results[category];
      if (result.total > 0) {
        const status = result.failed === 0 ? '✅' : '❌';
        this.log(`${status} ${category.toUpperCase()}: ${result.passed}/${result.total} passed`, 
                 result.failed === 0 ? 'success' : 'error');
      }
    });

    // Calculate overall results
    this.results.overall = categories.reduce((acc, category) => {
      const result = this.results[category];
      acc.passed += result.passed;
      acc.failed += result.failed;
      acc.total += result.total;
      return acc;
    }, { passed: 0, failed: 0, total: 0 });

    this.log('\n🎯 Overall Results:', 'info');
    this.log(`Total Tests: ${this.results.overall.total}`, 'info');
    this.log(`Passed: ${this.results.overall.passed}`, 'success');
    this.log(`Failed: ${this.results.overall.failed}`, 'error');
    
    const successRate = this.results.overall.total > 0 
      ? ((this.results.overall.passed / this.results.overall.total) * 100).toFixed(1)
      : 0;
    
    this.log(`Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
    
    return this.results.overall.failed === 0 && this.results.overall.total > 0;
  }

  async run(options = {}) {
    this.log('🚀 Starting TestSprite-style Comprehensive Testing Suite', 'info');
    this.log('=' .repeat(60), 'info');

    const { backend = true, frontend = true, e2e = false } = options;
    let allPassed = true;

    if (backend) {
      const backendPassed = await this.runBackendTests();
      allPassed = allPassed && backendPassed;
    }

    if (frontend) {
      const frontendPassed = await this.runFrontendTests();
      allPassed = allPassed && frontendPassed;
    }

    if (e2e) {
      const e2ePassed = await this.runE2ETests();
      allPassed = allPassed && e2ePassed;
    }

    const reportPassed = this.generateReport();

    this.log('\n' + '=' .repeat(60), 'info');
    if (allPassed && reportPassed) {
      this.log('🎉 All tests completed successfully!', 'success');
      process.exit(0);
    } else {
      this.log('💥 Some tests failed. Check the output above.', 'error');
      process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    backend: !args.includes('--no-backend'),
    frontend: !args.includes('--no-frontend'),
    e2e: args.includes('--e2e')
  };

  const runner = new TestRunner();
  runner.run(options).catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = TestRunner;
