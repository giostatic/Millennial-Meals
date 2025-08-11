import { useRef, useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';


// SVG icons
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="10" y1="6" x2="10" y2="14" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="10" x2="14" y2="10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const MinusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="6" y1="10" x2="14" y2="10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default function RecipesForm() {
    const { register, control, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            ingredients: [{ ingredient: '' }],
            instructions: [{ instruction: '' }]
        },
        shouldUnregister: true,
    });

    const [submitted, setSubmitted] = useState(false); // NEW

    const ingredientRefs = useRef([]);
    const instructionRefs = useRef([]);

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'ingredients'
    });

    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'instructions'
    });

    const onSubmit = (data) => {
        data.ingredients = (data.ingredients || []).filter(i => i && i.ingredient && i.ingredient.trim() !== '');
        data.instructions = (data.instructions || []).filter(i => i && i.instruction && i.instruction.trim() !== '');
        alert("Form submitted!");
        console.log("SUBMIT DATA:", data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 3000);
    };

    // Handler for Enter key to add ingredient
    const handleIngredientKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (value && value.trim() !== '') {
                appendIngredient({ ingredient: '' });
            }
        }
    };

    // Handler for Enter key to add step
    const handleInstructionKeyDown = (e, index) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (value && value.trim() !== '') {
                appendInstruction({ instruction: '' });
            }
        }
    };

    useEffect(() => {
        if (ingredientFields.length > 1) {
            const last = ingredientFields[ingredientFields.length - 1];
            ingredientRefs.current[last.id]?.focus();
        }
    }, [ingredientFields.length]);

    useEffect(() => {
        if (instructionFields.length > 1) {
            const last = instructionFields[instructionFields.length - 1];
            instructionRefs.current[last.id]?.focus();
        }
    }, [instructionFields.length]);

    console.log("RecipesForm rendered");

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("FORM ERRORS:", errors);
        })}>
          <div className="form-inner">
            <div>
                <label>Title of the Dish</label>
                <div className="field-row">
                    <input {...register('title', { required: true })} className="field-input full-width-input" />
                    <span className="icon-btn-group" /> {/* Invisible icon placeholder */}
                </div>
            </div>
            <div>
                <label>Description of the Dish</label>
                <div className="field-row">
                    <textarea {...register('description', { required: true })} className="field-input full-width-input textarea-uniform" />
                    <span className="icon-btn-group" /> {/* Invisible icon placeholder */}
                </div>
            </div>
            <div className="ingredients-section" id="ingredients-section">
                <label>Ingredients</label>
                <div className="vertical-fields">
                {ingredientFields.map((field, index) => (
                    <div
                        key={field.id}
                        className="field-row"
                    >
                        <input
                            {...register(`ingredients.${index}.ingredient`, {
                                required: "Required",
                                
                            })}
                            placeholder={`Ingredient #${index + 1}`}
                            onKeyDown={e => handleIngredientKeyDown(e, index)}
                            ref={el => ingredientRefs.current[field.id] = el}
                            className="field-input full-width-input"
                        />
                        {errors.ingredients?.[index]?.ingredient && (
                            <span className="error-message">{errors.ingredients[index].ingredient.message}</span>
                        )}
                        <span className="icon-btn-group">
                            {ingredientFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="icon-btn shadow-btn"
                                    aria-label="Remove ingredient"
                                >
                                    <MinusIcon />
                                </button>
                            )}
                            {index === ingredientFields.length - 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const value = getValues(`ingredients.${index}.ingredient`);
                                        if (value && value.trim() !== '') {
                                            appendIngredient({ ingredient: '' });
                                        }
                                    }}
                                    className="icon-btn plus-btn shadow-btn"
                                    aria-label="Add ingredient"
                                >
                                    <PlusIcon />
                                </button>
                            )}
                        </span>
                    </div>
                ))}
                </div>
            </div>
            <div className="instructions-section" id="instructions-section">
                <label>Instructions to Cooking the Dish</label>
                <div className="vertical-fields">
                {instructionFields.map((field, index) => (
                    <div
                        key={field.id}
                        className="field-row"
                    >
                        <textarea
                            {...register(`instructions.${index}.instruction`, {
                                required: "Required",
                                
                            })}
                            placeholder={`Step #${index + 1}`}
                            onKeyDown={e => handleInstructionKeyDown(e, index)}
                            ref={el => instructionRefs.current[field.id] = el}
                            className="field-input full-width-input textarea-uniform"
                        />
                        {errors.instructions?.[index]?.instruction && (
                            <span className="error-message">{errors.instructions[index].instruction.message}</span>
                        )}
                        <span className="icon-btn-group">
                            {instructionFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className="icon-btn shadow-btn"
                                    aria-label="Remove step"
                                >
                                    <MinusIcon />
                                </button>
                            )}
                            {index === instructionFields.length - 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const value = getValues(`instructions.${index}.instruction`);
                                        if (value && value.trim() !== '') {
                                            appendInstruction({ instruction: '' });
                                        }
                                    }}
                                    className="icon-btn plus-btn shadow-btn"
                                    aria-label="Add step"
                                >
                                    <PlusIcon />
                                </button>
                            )}
                        </span>
                    </div>
                ))}
                </div>
            </div>
            <button type="submit">Submit</button>
            {submitted && (
                <div className="submit-message">Recipe submitted!</div>
            )}
            <button onClick={() => alert('Test alert')}>Test Alert</button>
          </div>
        </form>
        <style>{styles}</style>
        </>
    );
}

const styles = `
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
    .center-fields {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }
    .vertical-fields {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }
    .field-row {
        align-items: center;
        gap: 8px;
        display: flex;
        margin-bottom: 6px;
        width: 100%;
    }
    .field-input,
    .full-width-input,
    .textarea-uniform {
        flex: 1 1 0%;
        min-width: 0;
        box-sizing: border-box;
    }
    .icon-btn {
        background: none;
        border: none;
        padding: 0;          /* Remove horizontal padding */
        cursor: pointer;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        height: 38px;
    }
    .shadow-btn {
        transition: box-shadow 0.15s;
    }
    .shadow-btn:active {
        box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }
    .plus-btn {
        margin-left: 4px;    /* Only add space if both icons are present */
    }
    .ingredients-section {
        margin-bottom: 24px;
    }
    .instructions-section {
        margin-bottom: 24px;
    }
    .textarea-uniform {
        resize: vertical;
        min-height: 38px;
    }
    .icon-placeholder {
        display: inline-block;
        width: 28px; /* Match the width of .icon-btn (20px icon + 8px padding) */
        height: 38px;
        visibility: hidden;
    }
    .icon-btn-group {
        display: flex;
        gap: 0;              /* No gap between icons and field */
        min-width: 24px;     /* Just enough for one icon */
        justify-content: flex-end;
    }
    .submit-message {
        color: #22c55e;
        margin-top: 12px;
        font-weight: bold;
    }
    .error-message {
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
    }
`;