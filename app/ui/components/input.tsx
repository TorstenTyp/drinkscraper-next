import React, { useState } from 'react';

interface SearchFormProps {
    action: (formData: FormData) => void;
    isPending: boolean;
}

export default function Input({ action, isPending }: SearchFormProps) {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
            <div className="flex flex-col w-[90vw]">
                <input
                    name="name"
                    className="bg-slate-200 h-[5vh] border-black rounded-lg text-lg m-2 p-4"
                    placeholder="Search for a cocktail"
                />
                <div className="bg-slate-200 h-[5vh] border-black rounded-lg text-lg m-2 flex flex-wrap items-center justify-center">
                    {tags.map((tag, index) => (
                        <div key={index} className="bg-slate-300 rounded-md px-2 py-1 m-1 flex">
                            {tag}
                            <button type="button" onClick={() => removeTag(index)} className="ml-2 text-sm">
                                &times;
                            </button>
                        </div>
                    ))}
                    <input
                        name="ingredients"
                        className="flex-grow h-[5vh] bg-slate-200 pl-4 rounded-lg text-lg outline-none"
                        placeholder="Add ingredients"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
            </div>
            <input name='tags' value={tags} type='hidden'></input>
            <div className="bg-slate-200 flex flex-col w-[10vw] h-[12vh] rounded-md">
                <button className="h-full" type="submit" disabled={isPending}>
                    Search
                </button>
            </div>
        </form>
    );
}
