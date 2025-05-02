import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
    const { mutate: signup, isPending: isLoading } = useMutation({
        // mutationFn: signupApi,
        mutationFn: () => {
            console.log('ss');
        },

        onSuccess: (data) => {
            console.log("Signup successful", data);
            toast.success("Account created successfully! Please check your email to verify your account.");
        },
        onError: () => {
            console.error("Signup failed");
        },
    })

    return { signup, isLoading };
}

export default useSignup