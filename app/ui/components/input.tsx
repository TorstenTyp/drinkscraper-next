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
        if (e.key === 'Backspace' && inputValue.length === 0){
            removeTag(tags.length - 1)
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <form
            action={action}
            className="form-container"
        >
            <div className="form-inner-container">
                <div className="input-section">
                    <input
                        name="name"
                        type="text"
                        className="search-input"
                        placeholder="Search for a cocktail"
                        maxLength={50}
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
                            name="ingredients"
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
                <input name='tags' value={tags} type='hidden' />
                <button
                    className="submit-button"
                    type="submit"
                    disabled={isPending}
                >
                    Search
                </button>
            </div>
        </form>
    );
};

