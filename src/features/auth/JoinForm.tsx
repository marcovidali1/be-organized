import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { HiEnvelope } from "react-icons/hi2";
import { useJoin } from "./useJoin";

import Spinner from "../../ui/Spinner";

const EMAIL_VALIDATION_REGEX = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

function JoinForm() {
    const { handleSubmit, register, formState } = useForm();
    const { join, isPending } = useJoin();

    const onSubmit: SubmitHandler<FieldValues> = (formData) => {
        const { email } = formData;
        join(email);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label
                className={`input input-bordered flex items-center gap-2 ${formState.errors.email && "input-error"} ${isPending && "input-disabled"}`}
            >
                <HiEnvelope />

                <input
                    className="grow"
                    placeholder="Type your email here..."
                    type="email"
                    disabled={isPending}
                    required
                    {...register("email", {
                        pattern: {
                            value: EMAIL_VALIDATION_REGEX,
                            message: "",
                        },
                    })}
                />
            </label>

            <button className="btn btn-neutral" disabled={isPending}>
                {isPending ? <Spinner /> : "Join"}
            </button>
        </form>
    );
}

export default JoinForm;
