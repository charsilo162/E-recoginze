import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import { useNominationStore } from '../../store/useNominationStore';

export const NominationModal = () => {
  const {
    isOpen,
    closeModal,
    categories,
    fetchCategories,
    submitNomination,
    isSubmitting,
    error,
    success,
  } = useNominationStore();

  const fileInputRef = useRef(null);

  const [categoryId, setCategoryId] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [nominateName, setNominateName] = useState('');
  const [nominateEmail, setNominateEmail] = useState('');
  const [reason, setReason] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('category_id', categoryId);

    if (imageFile) {
      formData.append('avatar', imageFile);
    }

    formData.append('nominate_name', nominateName);
    formData.append('nominate_email', nominateEmail);
    formData.append('reason', reason);
    formData.append(
      'subscribe_notifications',
      subscribe ? 1 : 0
    );

    try {
      await submitNomination(formData);

      setTimeout(() => {
        closeModal();

        setNominateName('');
        setNominateEmail('');
        setReason('');
        setImagePreview(null);
        setImageFile(null);
        setSubscribe(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-white">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold">
              Submit a Nomination
            </h2>

            <p className="text-orange-100 mt-1 text-sm">
              Recognize and celebrate outstanding individuals.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Reward Category
              </label>

              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:border-orange-500 focus:outline-none"
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload */}
            <div className="flex justify-center">
              <div
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="w-32 h-32 border-2 border-dashed border-orange-400 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:border-orange-600 transition"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera
                      size={28}
                      className="mx-auto text-orange-500"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Upload Photo
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Nominee Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Nominee Name
              </label>

              <input
                type="text"
                required
                value={nominateName}
                onChange={(e) =>
                  setNominateName(e.target.value)
                }
                placeholder="Enter nominee's full name"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Nominee Email
              </label>

              <input
                type="email"
                required
                value={nominateEmail}
                onChange={(e) =>
                  setNominateEmail(e.target.value)
                }
                placeholder="Enter nominee's email address"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Why does this person deserve recognition?
              </label>

              <textarea
                rows={5}
                required
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
                placeholder="Provide details about achievements, contributions, leadership, impact, or other reasons for this nomination..."
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>

            {/* Subscribe */}
            <div>
              <label className="flex items-center gap-3 text-gray-800 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) =>
                    setSubscribe(e.target.checked)
                  }
                  className="w-4 h-4 accent-orange-500"
                />

                Receive nomination updates via email
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg p-3 text-sm">
                ✓ Nomination submitted successfully.
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Nomination'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};