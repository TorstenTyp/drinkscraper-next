interface SearchFormProps {
    action: (formData: FormData) => void;
    isPending: boolean;
  }

export default function Input({ action, isPending }: SearchFormProps) {

    return (
        <form action={action} className="items-center justify-center flex p-4 shadow-xl">
            <div className="flex flex-col w-[90vw]">
                <input
                    name="nameSearch"
                    className="bg-slate-200 h-[5vh] border-black rounded-lg text-lg m-2 p-4"
                    placeholder="Search for a cocktail"
                    defaultValue={''}
                />
                <input
                    name="ingredients"
                    className="bg-slate-200 h-[5vh] border-black rounded-lg text-lg m-2 p-4"
                    placeholder="Add specific ingredients"
                    defaultValue={''}
                />
            </div>
            <div className="bg-slate-200 flex flex-col w-[10vw] h-[12vh] rounded-md">
                <button className="h-full"
                    type="submit"
                    disabled={isPending}>
                    Search
                </button>
            </div>
        </form>
    );
}
