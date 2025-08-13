import imageCompression from 'browser-image-compression';
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
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [mealTime, setMealTime] = useState('');
    const [base, setBase] = useState('');

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

    // Handle image selection and compression
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files).slice(0, 3);
        const compressedImages = [];
        const previews = [];
        for (const file of files) {
            const compressed = await imageCompression(file, {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            });
            compressedImages.push(compressed);

            // Generate preview URL for compressed image
            const previewUrl = URL.createObjectURL(compressed);
            previews.push(previewUrl);
        }
        setImages(compressedImages);
        setImagePreviews(previews);

        // Clean up old previews
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };

    const onSubmit = async (data) => {
        data.ingredients = (data.ingredients || []).filter(i => i && i.ingredient && i.ingredient.trim() !== '');
        data.instructions = (data.instructions || []).filter(i => i && i.instruction && i.instruction.trim() !== '');
        data.mealTime = mealTime;
        data.base = base;

        // --- Generate a unique ID for this recipe ---
        const id = Date.now().toString();
        data.id = id;

        setUploading(true);
        let imageUrls = [];
        try {
            // Upload images to blob store
            for (const img of images) {
                const formData = new FormData();
                formData.append('file', img);
                const res = await fetch('/api/recipes-image-upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!res.ok) throw new Error('Image upload failed');
                const { url } = await res.json();
                imageUrls.push(url);
            }
            data.images = imageUrls;

            // --- Store recipe JSON with unique filename ---
            const response = await fetch('/api/recipes-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Save with unique filename using the id
                body: JSON.stringify({ ...data, filename: `recipes/${id}.json` }),
            });
            if (!response.ok) throw new Error('Failed to store recipe');
            const result = await response.json();
            alert("Form submitted and recipe saved!");
            setSubmitted(true);
            reset();
            setImages([]);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            alert("Error: " + err.message);
        }
        setUploading(false);
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

    return (
        <>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("FORM ERRORS:", errors);
          })}
          style={{ paddingBottom: "90px" }} // <-- Add this line
        >
          <div className="form-inner">
            <div>
                <label>Title of the Dish</label>
                {errors.title && (
                    <div className="error-message" style={{ marginBottom: 4 }}>Required</div>
                )}
                <div className="field-row">
                    <input {...register('title', { required: "Required" })} className="field-input full-width-input" />
                    <span className="icon-btn-group" /> {/* Invisible icon placeholder */}
                </div>
            </div>
            <div>
                <label>Description of the Dish</label>
                {errors.description && (
                    <div className="error-message" style={{ marginBottom: 4 }}>Required</div>
                )}
                <div className="field-row">
                    <textarea {...register('description', { required: "Required" })} className="field-input full-width-input textarea-uniform" />
                    <span className="icon-btn-group" /> {/* Invisible icon placeholder */}
                </div>
            </div>
            <div className="ingredients-section" id="ingredients-section">
                <label>Ingredients</label>
                {errors.ingredients && errors.ingredients.some(e => e?.ingredient) && (
                    <div className="error-message" style={{ marginBottom: 4 }}>Required</div>
                )}
                <div className="vertical-fields">
                {ingredientFields.map((field, index) => (
                    <div key={field.id} className="field-row">
                        <input
                            {...register(`ingredients.${index}.ingredient`, { required: "Required" })}
                            placeholder={`Ingredient #${index + 1}`}
                            onKeyDown={e => handleIngredientKeyDown(e, index)}
                            className="field-input full-width-input"
                        />
                        <span className="icon-btn-group">
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
                        </span>
                    </div>
                ))}
                </div>
            </div>
            <div className="instructions-section" id="instructions-section">
                <label>Instructions to Cooking the Dish</label>
                {errors.instructions && errors.instructions.some(e => e?.instruction) && (
                    <div className="error-message" style={{ marginBottom: 4 }}>Required</div>
                )}
                <div className="vertical-fields">
                    {instructionFields.map((field, index) => (
                        <div key={field.id} className="field-row">
                            <input
                                {...register(`instructions.${index}.instruction`, { required: "Required" })}
                                placeholder={`Step #${index + 1}`}
                                onKeyDown={e => handleInstructionKeyDown(e, index)}
                                className="field-input full-width-input"
                            />
                            <span className="icon-btn-group">
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
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* --- New dropdowns for meal time and base --- */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="mealTime">Select a meal time</label>
                    <select
                        id="mealTime"
                        value={mealTime}
                        onChange={e => setMealTime(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '4px' }}
                    >
                        <option value="">-- Choose --</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label htmlFor="base">Select the base</label>
                    <select
                        id="base"
                        value={base}
                        onChange={e => setBase(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '4px' }}
                    >
                        <option value="">-- Choose --</option>
                        <option value="poultry">Poultry</option>
                        <option value="beef">Beef</option>
                        <option value="pork">Pork</option>
                        <option value="seafood">Seafood</option>
                        <option value="plant-based">Plant-Based</option>
                        <option value="pastries">Pastries</option>
                        <option value="starches">Starches</option>
                        <option value="drinks">Drinks</option>
                    </select>
                </div>
            </div>
            {/* --- End new dropdowns --- */}
            {/* --- Image previews row --- */}
            {imagePreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '12px', margin: '16px 0', justifyContent: 'center' }}>
                    {imagePreviews.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                        />
                    ))}
                </div>
            )}
            <div>
                <label>Upload up to 3 images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={images.length >= 3}
                />
                <div>
                    {images.map((img, idx) => (
                        <span key={idx}>{img.name}</span>
                    ))}
                </div>
            </div>
            <button type="submit" className="submit-btn" disabled={uploading}>
                {uploading ? "Uploading..." : "Submit"}
            </button>
            {submitted && (
                <div className="submit-message">Recipe submitted!</div>
            )}
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
    .full-width-input {
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
        margin-bottom: 0; /* <-- Remove bottom margin to eliminate space above instructions */
    }
    .instructions-section {
        margin-bottom: 24px;
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
    .submit-btn {
        background-color: #22c55e;
        color: #fff;
        border: none;
        padding: 10px 28px;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        margin-top: 5px;
        transition: background 0.15s;
    }
    .submit-btn:hover,
    .submit-btn:focus {
        background-color: #16a34a;
    }
`;