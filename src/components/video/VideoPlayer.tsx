
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX, Globe, FileText, SkipForward } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoPlayerProps {
  onSkip?: () => void;
  showInModal?: boolean;
}

type Language = {
  code: string;
  name: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onSkip, showInModal = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [autoTextReading, setAutoTextReading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const languages: Language[] = [
    { code: 'fr', name: 'Français' },
    { code: 'fr-simple', name: 'Français simplifié' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'uk', name: 'Українська' },
    { code: 'pt', name: 'Português' }
  ];
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].code);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleAutoReading = () => {
    setAutoTextReading(!autoTextReading);
    // Logic to implement text-to-speech would go here
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Logic to change subtitles based on language
  };

  return (
    <div className={`w-full ${showInModal ? 'max-w-2xl mx-auto' : ''}`}>
      <Card className="overflow-hidden">
        <div className="relative">
          <video 
            ref={videoRef}
            className="w-full rounded-t-lg"
            controls
            poster="/placeholder.svg"
          >
            <source src="/videos/presentation.mp4" type="video/mp4" />
            <track 
              kind="subtitles" 
              src={`/videos/subtitles/presentation-${selectedLanguage}.vtt`} 
              srcLang={selectedLanguage} 
              label={languages.find(l => l.code === selectedLanguage)?.name || 'Français'} 
              default={selectedLanguage === 'fr'} 
            />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          
          {onSkip && (
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-3 right-3 bg-black/60 text-white hover:bg-black/80"
              onClick={onSkip}
            >
              <SkipForward className="h-4 w-4 mr-1" />
              Passer
            </Button>
          )}
        </div>
        
        <div className="p-4 bg-muted/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMute}
              className="flex items-center gap-1"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isMuted ? 'Activer le son' : 'Couper le son'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleAutoReading}
              className={`flex items-center gap-1 ${autoTextReading ? 'bg-primary/10' : ''}`}
            >
              <FileText className="h-4 w-4" />
              Lecture audio du texte
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      <div className="text-center mt-3 text-sm text-muted-foreground">
        Cette vidéo vous présente le fonctionnement de la plateforme en 2 minutes.
        <Button variant="link" className="text-sm p-0 h-auto" onClick={() => window.location.href = '/documents'}>
          Retrouver cette vidéo dans mes documents
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
