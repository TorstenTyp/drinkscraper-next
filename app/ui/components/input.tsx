'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface SearchFormProps {
    action: (name: string, ingredients: string[]) => void;
    isPending: boolean;
}

export default function Input({ action, isPending }: SearchFormProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueName, setInputValueName] = useState('');

    useEffect(() => {
        const name = searchParams.get('name') || '';
        const ingredients = searchParams.get('ingredients')?.split(',').filter(Boolean) || [];
        setInputValueName(name);
        setTags(ingredients);
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams);
        if (inputValueName) {
            params.set('name', inputValueName);
        } else {
            params.delete('name');
        }
        if (tags.length > 0) {
            params.set('ingredients', tags.join(','));
        } else {
            params.delete('ingredients');
        }
        replace(`${pathname}?${params.toString()}`);
        action(inputValueName, tags);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueName(e.target.value);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            } else {
                handleSubmit();
            }
        } else if (e.key === ' ' && inputValue.trim() !== '') {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
        if (e.key === 'Backspace' && inputValue.length === 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="form-container">
            <div className="form-inner-container">
                <div className="input-section">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a cocktail"
                        maxLength={50}
                        onChange={handleNameChange}
                        onKeyDown={handleNameKeyDown}
                        value={inputValueName}
                    />
                    <div className="tags-container">
                        <div className="tags-list">
                            {tags.map((tag, index) => (
                                <div key={index} className="tag-item">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="tag-remove-button"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder={tags.length > 0 ? "" : "Add ingredients"}
                            className="ingredients-input"
                            maxLength={tags.length > 4 ? 0 : 15}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                </div>
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    type="button"
                    disabled={isPending}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

