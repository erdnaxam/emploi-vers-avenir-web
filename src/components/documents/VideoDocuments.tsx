
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoDocument {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  languages: string[];
}

const videos: VideoDocument[] = [
  {
    id: 'intro',
    title: 'Présentation de la plateforme',
    description: 'Cette vidéo vous présente le fonctionnement de la plateforme en 2 minutes.',
    thumbnail: '/placeholder.svg',
    url: '/videos/presentation.mp4',
    languages: ['Français', 'Français simplifié', 'English', 'العربية', 'Українська', 'Português']
  }
];

const VideoDocuments = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Vidéos explicatives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col md:flex-row gap-4 border p-3 rounded-lg">
              <div className="w-full md:w-1/3 aspect-video bg-muted rounded-md overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{video.title}</h3>
                <p className="text-muted-foreground mb-3">{video.description}</p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Disponible en: {video.languages.join(', ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate('/introduction')}
                  >
                    <Play className="h-4 w-4" />
                    Regarder
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => window.open(video.url, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDocuments;
