import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register(){
const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)){
            newErrors.email = 'Invalid email address';
        }

        if(formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;

    };

    const  handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            console.log ('Form Submitted:', formData);
            //submit logic (API call)
            let result = await fetch("http://localhost:8000/auth/register",{
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                headers:{
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
                
            })
            result = await result.json()
            console.warn("result",result)

            if(result.success){
                alert("Registration Successful!");
                setFormData({ email: '', password: '', confirmPassword: '' });
                setTimeout(() => navigate('/login'), 1500);
                navigate('/login');
            }else{
                setErrors({ api: result.message || 'Registration failed' });
            }
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
            
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
                {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

                <div>
                    <label className='block mb-1 font-semibold'>Email</label>
                    <input 
                        type="email"
                        name='email'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

                </div>

                <div>
                    <label className='block mb-1 font-semibold'>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Confirm Password</label>
                    <input 
                        type="password"
                        name="confirmPassword" 
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value = {formData.confirmPassword}
                        onChange = {handleChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
                >
                    Register
                </button>   
            </form>
        </div>
    );
}