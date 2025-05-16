// components/ScrollButton.tsx
"use client";

import { GTM } from '../google-tag-manager/utils';

type ScrollButtonProps = {
  targetId: string;
  label: string;
  backgroundColor: string;
  textColor: string;
};

export default function ScrollButton( { targetId, label, backgroundColor, textColor }: ScrollButtonProps ) {

  const handleScroll = () => {
    // Registrar el evento en GTM
    GTM.event('section_navigation', {
      button_name: `scroll_to_${targetId}`,
      category: 'navigation',
      action: 'click',
      target_section: targetId,
      button_label: label
    });

    // Lógica de scroll existente
    const targetElement = document.getElementById(targetId);
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <button
      onClick={ handleScroll }
      className="py-2 px-5 font-semibold text-white rounded-md"
      style={ { backgroundColor, color: textColor } }
    >
      { label }
    </button>
  );
}
