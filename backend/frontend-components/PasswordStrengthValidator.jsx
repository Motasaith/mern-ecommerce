import React, { useState, useEffect } from 'react';
import './PasswordStrengthValidator.css';

const PasswordStrengthValidator = ({ password, onValidityChange }) => {
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('Very Weak');

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (pwd) => {
    const newRequirements = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[@$!%*?&]/.test(pwd)
    };

    setRequirements(newRequirements);

    // Calculate strength
    const metRequirements = Object.values(newRequirements).filter(Boolean).length;
    setStrength(metRequirements);

    // Set strength text and notify parent
    let strengthLevel = 'Very Weak';
    let isValid = false;

    if (metRequirements === 5) {
      strengthLevel = 'Very Strong';
      isValid = true;
    } else if (metRequirements === 4) {
      strengthLevel = 'Strong';
      isValid = true;
    } else if (metRequirements === 3) {
      strengthLevel = 'Medium';
    } else if (metRequirements === 2) {
      strengthLevel = 'Weak';
    } else if (metRequirements === 1) {
      strengthLevel = 'Very Weak';
    }

    setStrengthText(strengthLevel);
    
    // Notify parent component about validity
    if (onValidityChange) {
      onValidityChange(isValid, newRequirements);
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 5: return '#28a745'; // Very Strong - Green
      case 4: return '#20c997'; // Strong - Teal
      case 3: return '#ffc107'; // Medium - Yellow
      case 2: return '#fd7e14'; // Weak - Orange
      case 1: return '#dc3545'; // Very Weak - Red
      default: return '#6c757d'; // No input - Gray
    }
  };

  const getStrengthWidth = () => {
    return `${(strength / 5) * 100}%`;
  };

  if (!password) {
    return null;
  }

  return (
    <div className="password-strength-validator">
      <div className="strength-meter">
        <div className="strength-bar-container">
          <div 
            className="strength-bar"
            style={{ 
              width: getStrengthWidth(),
              backgroundColor: getStrengthColor(),
              transition: 'all 0.3s ease'
            }}
          />
        </div>
        <span 
          className="strength-text"
          style={{ color: getStrengthColor() }}
        >
          {strengthText}
        </span>
      </div>

      <div className="requirements-list">
        <h4>Password Requirements:</h4>
        <ul>
          <li className={requirements.length ? 'met' : 'unmet'}>
            <span className="requirement-icon">
              {requirements.length ? '✅' : '❌'}
            </span>
            At least 8 characters long
          </li>
          <li className={requirements.uppercase ? 'met' : 'unmet'}>
            <span className="requirement-icon">
              {requirements.uppercase ? '✅' : '❌'}
            </span>
            One uppercase letter (A-Z)
          </li>
          <li className={requirements.lowercase ? 'met' : 'unmet'}>
            <span className="requirement-icon">
              {requirements.lowercase ? '✅' : '❌'}
            </span>
            One lowercase letter (a-z)
          </li>
          <li className={requirements.number ? 'met' : 'unmet'}>
            <span className="requirement-icon">
              {requirements.number ? '✅' : '❌'}
            </span>
            One number (0-9)
          </li>
          <li className={requirements.special ? 'met' : 'unmet'}>
            <span className="requirement-icon">
              {requirements.special ? '✅' : '❌'}
            </span>
            One special character (@$!%*?&)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthValidator;
