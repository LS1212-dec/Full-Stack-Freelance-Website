import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/authSlice';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(state => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isError) {
        alert(message);
        dispatch(reset());
    }
    if (user) {
        navigate('/dashboard');
    }
  }, [user, isError, message, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 card bg-white dark:bg-dark-card border-none shadow-2xl p-10">
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-light-text dark:text-dark-text">Welcome back</h2>
            <p className="mt-2 text-sm text-light-textMuted dark:text-dark-textMuted">
                Don't have an account? <Link to="/register" className="font-medium text-primary hover:text-primary-hover transition-colors">Sign up today</Link>
            </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="relative">
              <label className="label-text">Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="input-field peer"
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.username.message}</p>}
            </div>

            <div className="relative">
              <label className="label-text">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input-field peer"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
