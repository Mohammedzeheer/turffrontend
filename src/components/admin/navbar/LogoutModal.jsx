import { useState } from 'react';

function LogoutModal({ handleLogout }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleConfirmLogout = () => {
    handleLogout();
    closeModal();
  };

  return (
    <div className="flex items-center ml-auto">
      <button onClick={openModal} className="text-dark-purple hover:text-gray-300">
        Logout
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>

          <div className="modal-container bg-white w-64 p-4 rounded-lg shadow-lg">
            <p className="mb-4">Do you want to logout?</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmLogout} className="mr-2 text-sm text-white bg-red-500 px-3 py-1 rounded">
                Yes
              </button>
              <button onClick={closeModal} className="text-sm text-gray-700 bg-gray-300 px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoutModal;
