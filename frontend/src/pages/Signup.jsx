import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser, reset } from '../features/authSlice';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
      defaultValues: { role: 'CLIENT' }
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (isError) {
        alert(message);
        dispatch(reset());
    }
    if (isSuccess || user) {
        dispatch(reset());
        navigate('/login');
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-xl w-full space-y-8 card bg-white dark:bg-dark-card border-none shadow-2xl p-10">
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-light-text dark:text-dark-text">Join GigHive</h2>
            <p className="mt-2 text-sm text-light-textMuted dark:text-dark-textMuted">
                Already have an account? <Link to="/login" className="font-medium text-secondary hover:text-secondary-hover transition-colors">Log in</Link>
            </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Custom Role Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
              <label className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${selectedRole === 'CLIENT' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-light-border dark:border-dark-border hover:border-gray-300'}`}>
                  <input type="radio" value="CLIENT" {...register("role")} className="hidden" />
                  <span className={`block font-bold mb-1 ${selectedRole === 'CLIENT' ? 'text-primary' : 'text-light-text dark:text-dark-text'}`}>Im a Client</span>
                  <span className="text-xs text-light-textMuted dark:text-dark-textMuted">Hiring for a project</span>
              </label>
              
              <label className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${selectedRole === 'FREELANCER' ? 'border-secondary bg-secondary/5 dark:bg-secondary/10' : 'border-light-border dark:border-dark-border hover:border-gray-300'}`}>
                  <input type="radio" value="FREELANCER" {...register("role")} className="hidden" />
                  <span className={`block font-bold mb-1 ${selectedRole === 'FREELANCER' ? 'text-secondary' : 'text-light-text dark:text-dark-text'}`}>I'm a Freelancer</span>
                  <span className="text-xs text-light-textMuted dark:text-dark-textMuted">Looking for work</span>
              </label>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="label-text">Username</label>
                  <input
                    {...register("username", { required: "Username is required", minLength: {value: 3, message: "Min 3 chars"} })}
                    className="input-field" placeholder="johndoe123"
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.username.message}</p>}
                </div>

                <div className="relative">
                  <label className="label-text">Email address</label>
                  <input
                    type="email"
                    {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                    })}
                    className="input-field" placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.email.message}</p>}
                </div>
            </div>

            <div className="relative pt-2">
              <label className="label-text">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required", minLength: {value: 6, message: "Min 6 chars"} })}
                className="input-field" placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn w-full py-3 text-lg ${selectedRole === 'FREELANCER' ? 'btn-secondary' : 'btn-primary'}`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
