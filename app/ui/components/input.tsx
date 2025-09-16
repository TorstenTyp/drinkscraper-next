import React, { useState } from 'react';

interface SearchFormProps {
    action: (formData: FormData) => void;
    isPending: boolean;
}

export default function Input({ action, isPending }: SearchFormProps) {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 15) {
            setInputValue(e.target.value);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ' && inputValue.trim() !== '') {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <form action={action} className="items-center justify-center flex p-4 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-2 w-full pl-4 pr-4">
                <div className="flex-1 space-y-2">
                    <input
                        name="name"
                        type="text"
                        className="w-full p-2 border rounded bg-slate-200 outline-none"
                        placeholder="Search for a cocktail"
                    />
                    <div className="bg-slate-200 rounded flex items-center max-h-10 overflow-x-auto no-scrollbar">
                        <div className="flex flex-nowrap">
                            {tags.map((tag, index) => (
                                <div key={index} className="bg-slate-300 rounded-md px-2 py-1 m-1 flex items-center whitespace-nowrap">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-sm hover:text-red-500"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            name="ingredients"
                            type={tags.length > 4 ? "hidden" : "text"}
                            placeholder={tags.length > 0 ? "" : "Add ingredients"}
                            className="flex-shrink-0 w-full p-2 border-none bg-slate-200 outline-none"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                </div>
                <input name='tags' value={tags} type='hidden' />
                <button
                    className="hidden sm:block p-2 bg-slate-200 rounded hover:bg-gray-600"
                    type="submit"
                    disabled={isPending}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

