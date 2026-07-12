import React, { useState } from 'react';
import { User, Lock, EyeOff, Eye, Mail, Building2, CheckCircle2, Shield, BarChart3, Users } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import logo from '../../assets/logo.png';
import { authApi } from '../../utils/api';
import './SignUpPage.css';

const SignUpPage = ({ onSignUp, onNavigateToSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password requirements check
    const hasNum = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (password.length < 8 || !hasNum || !hasUpper || !hasSpecial) {
      setError('Password does not meet all requirements.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await authApi.signup(email, password, fullName, companyName);
      if (onSignUp) {
        onSignUp(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>
      <div className="signup-container">
        
        {/* Main Card */}
        <div className="signup-card">
          
          {/* Left Section */}
          <div className="signup-left">
            <div className="signup-left-content">
              <div className="logo-container">
                <div className="logo-img-wrapper">
                  <img src={logo} alt="RebarOptima" className="logo-img" />
                </div>
              </div>

              <div className="welcome-text">
                <h1>Build Better.<br/><span className="highlight-text">Manage Smarter.</span><br/>Grow Together.</h1>
                <p>Create your account and take control of your construction projects.</p>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon"><Shield size={20} color="#a468eb" /></div>
                  <div className="feature-text">
                    <h3>Centralized Project Management</h3>
                    <p>Keep all your projects, tasks & teams in one place.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><BarChart3 size={20} color="#a468eb" /></div>
                  <div className="feature-text">
                    <h3>Real-time Collaboration</h3>
                    <p>Work together and stay updated in real time.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><Lock size={20} color="#a468eb" /></div>
                  <div className="feature-text">
                    <h3>Secure & Reliable</h3>
                    <p>Enterprise-grade security for your data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="diagonal-overlay"></div>
          </div>

          {/* Right Section */}
          <div className="signup-right">
            <div className="signup-form-container">
              <div className="mobile-logo">
                  <img src={logo} alt="RebarOptima" className="logo-img" />
              </div>

              <div className="form-header">
                <h2>Create Your Account</h2>
                <p className="subtitle">Let's get started with your free account</p>
              </div>

              {error && <div className="auth-error-message">{error}</div>}

              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" color="#8d86b8" />
                      <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Company Name</label>
                    <div className="input-wrapper">
                      <Building2 size={18} className="input-icon" color="#8d86b8" />
                      <input 
                        type="text" 
                        placeholder="Enter company name" 
                        required 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" color="#8d86b8" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" color="#8d86b8" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye size={18} color="#8d86b8" /> : <EyeOff size={18} color="#8d86b8" />}
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" color="#8d86b8" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <Eye size={18} color="#8d86b8" /> : <EyeOff size={18} color="#8d86b8" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <div className="req-grid">
                    <div className="req-item"><CheckCircle2 size={14} color="#7016d2" /> At least 8 characters</div>
                    <div className="req-item"><CheckCircle2 size={14} color="#7016d2" /> One number</div>
                    <div className="req-item"><CheckCircle2 size={14} color="#7016d2" /> One uppercase letter</div>
                    <div className="req-item"><CheckCircle2 size={14} color="#7016d2" /> One special character</div>
                  </div>
                </div>

                <div className="form-actions">
                  <label className="remember-me terms">
                    <input type="checkbox" required />
                    <span className="checkmark"></span>
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" className="signup-button" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                
                <div className="divider">
                  <span>OR</span>
                </div>

                <button type="button" className="google-signup">
                   <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  Sign up with Google
                </button>
              </form>

              <p className="signup-prompt">
                Already have an account? <a href="#" onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateToSignIn) onNavigateToSignIn();
                }}>Sign In</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="signup-bottom-bar">
          <div className="bottom-bar-item left-item">
            <div className="bottom-icon-wrapper">
              <Shield size={20} color="var(--accent)" />
            </div>
            <div className="bottom-text">
              <h4>Enterprise Security</h4>
              <p>Your data is protected with industry-leading security.</p>
            </div>
          </div>
          
          <div className="bottom-separator"></div>

          <div className="bottom-bar-item center-item">
            <div className="bottom-icon-wrapper">
              <Users size={20} color="var(--accent)" />
            </div>
            <div className="bottom-text">
              <h4>Built for Construction Teams</h4>
              <p>Designed to simplify project management for contractors, builders & teams.</p>
            </div>
          </div>

          <div className="bottom-separator"></div>

          <div className="bottom-bar-item right-item">
            <div className="bottom-icon-wrapper">
              <BarChart3 size={20} color="var(--accent)" />
            </div>
            <div className="bottom-text">
              <h4>Save Time & Reduce Costs</h4>
              <p>Streamline workflows and make smarter decisions every day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
