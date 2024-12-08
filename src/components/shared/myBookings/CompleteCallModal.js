import React, { useState } from 'react';
import Modal from './../../common/modal/Modal';
import ModalActions from './../../common/modal/ModalActions';
import StarRating from './StarRating';
import SessionNotes from './SessionNotes';

export default function CompleteCallModal({ isOpen, onClose, onSubmit }) {
  const [satisfaction, setSatisfaction] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(satisfaction, notes);
    setNotes('');
    setSatisfaction(5);
  };

  return (
    <Modal isOpen={isOpen}>
      <h2 className="text-xl font-semibold mb-4">Complete Call</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <StarRating rating={satisfaction} onChange={setSatisfaction} />
        <SessionNotes value={notes} onChange={setNotes} />
        <ModalActions onCancel={onClose} onSubmit={onSubmit} />
      </form>
    </Modal>
  );
}

