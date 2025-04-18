
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceDictationProps {
  onText?: (text: string) => void;
}

const VoiceDictation: React.FC<VoiceDictationProps> = ({ onText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  // Gérer la disponibilité de l'API de reconnaissance vocale
  const isSpeechRecognitionAvailable = 
    typeof window !== 'undefined' && 
    (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));

  const startSpeechRecognition = () => {
    if (!isSpeechRecognitionAvailable) {
      toast({
        title: "Dictée non disponible",
        description: "Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Chrome, Edge ou Safari.",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      toast({
        title: "Dictée activée",
        description: "Parlez clairement, je vous écoute...",
      });
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onText) {
        onText(transcript);
      }
      
      // Focus sur l'élément actif (s'il s'agit d'un champ de texte)
      const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        const currentValue = activeElement.value || '';
        const selectionStart = activeElement.selectionStart || 0;
        const selectionEnd = activeElement.selectionEnd || 0;
        
        // Insérer le texte à la position du curseur
        const newValue = currentValue.substring(0, selectionStart) + 
                        transcript + 
                        currentValue.substring(selectionEnd);
        
        activeElement.value = newValue;
        
        // Déclencher un événement input pour les frameworks réactifs
        const inputEvent = new Event('input', { bubbles: true });
        activeElement.dispatchEvent(inputEvent);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
      toast({
        title: "Erreur de dictée",
        description: "Une erreur s'est produite lors de la reconnaissance vocale.",
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsRecording(false);
      toast({
        title: "Dictée terminée",
        description: "Votre texte a été ajouté",
      });
    };
    
    recognition.start();
  };
  
  const stopSpeechRecognition = () => {
    setIsRecording(false);
    if (isSpeechRecognitionAvailable) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.abort();
    }
  };
  
  useEffect(() => {
    return () => {
      // Nettoyer en cas de démontage du composant
      if (isRecording) {
        stopSpeechRecognition();
      }
    };
  }, [isRecording]);

  if (!isSpeechRecognitionAvailable) {
    return null;
  }

  return (
    <Button
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      onClick={() => isRecording ? stopSpeechRecognition() : startSpeechRecognition()}
      title={isRecording ? "Arrêter la dictée" : "Dicter du texte"}
      className="fixed right-4 top-20 z-50 rounded-full shadow-md h-12 w-12"
    >
      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
};

export default VoiceDictation;
