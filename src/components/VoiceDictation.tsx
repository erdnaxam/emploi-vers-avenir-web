
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceDictationProps {
  onText?: (text: string) => void;
}

const VoiceDictation: React.FC<VoiceDictationProps> = ({ onText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  // Speech Recognition
  const isSpeechRecognitionAvailable = 
    typeof window !== 'undefined' && 
    (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));

  // Speech Synthesis
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

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
      
      const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        const currentValue = activeElement.value || '';
        const selectionStart = activeElement.selectionStart || 0;
        const selectionEnd = activeElement.selectionEnd || 0;
        
        const newValue = currentValue.substring(0, selectionStart) + 
                        transcript + 
                        currentValue.substring(selectionEnd);
        
        activeElement.value = newValue;
        
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

  // Text-to-speech functionality
  const readSelectedText = () => {
    if (!synth) {
      toast({
        title: "Lecture vocale non disponible",
        description: "Votre navigateur ne supporte pas la synthèse vocale.",
        variant: "destructive",
      });
      return;
    }

    const selectedText = window.getSelection()?.toString();
    if (!selectedText) {
      toast({
        title: "Aucun texte sélectionné",
        description: "Sélectionnez du texte pour le faire lire.",
      });
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      toast({
        title: "Lecture en cours",
        description: "Cliquez sur le bouton pour arrêter.",
      });
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      toast({
        title: "Lecture terminée",
      });
    };

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };
  
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopSpeechRecognition();
      }
      if (synth && isSpeaking) {
        synth.cancel();
      }
    };
  }, [isRecording, isSpeaking]);

  if (!isSpeechRecognitionAvailable) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-50 flex flex-col gap-2">
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={() => isRecording ? stopSpeechRecognition() : startSpeechRecognition()}
        title={isRecording ? "Arrêter la dictée" : "Dicter du texte"}
        className="rounded-full shadow-md h-12 w-12"
      >
        {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>

      <Button
        variant={isSpeaking ? "destructive" : "outline"}
        size="icon"
        onClick={() => isSpeaking ? stopSpeaking() : readSelectedText()}
        title={isSpeaking ? "Arrêter la lecture" : "Lire le texte sélectionné"}
        className="rounded-full shadow-md h-12 w-12"
      >
        {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default VoiceDictation;
