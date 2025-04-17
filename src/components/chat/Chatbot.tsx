import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Award, Zap, Star, Trophy, Heart, Move } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import { stepsData } from '@/data/stepsData';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Réponses prédéfinies pertinentes pour chaque étape
const stepResponses = {
  '1': [
    "Pour créer un CV efficace, pensez à mettre en avant vos compétences et expériences les plus pertinentes pour le poste visé.",
    "N'oubliez pas que votre CV doit être clair, concis et sans fautes d'orthographe.",
    "Vous pouvez utiliser notre générateur de CV pour créer un document professionnel facilement.",
  ],
  '2': [
    "Pour bien vous préparer à chercher un emploi, définissez clairement votre projet professionnel et vos critères de recherche.",
    "Organisez votre temps avec un planning de recherche d'emploi régulier.",
    "Pensez à mettre à jour votre profil LinkedIn et autres réseaux professionnels.",
  ],
  '3': [
    "Pour trouver des offres pertinentes, utilisez plusieurs canaux : sites d'emploi, réseaux sociaux, réseau personnel, etc.",
    "Adaptez chaque candidature à l'offre d'emploi visée, ne faites pas de candidatures génériques.",
    "N'hésitez pas à relancer après avoir envoyé votre candidature si vous n'avez pas de réponse au bout d'une semaine.",
  ],
  '4': [
    "Renseignez-vous sur l'entreprise avant l'entretien : son activité, ses valeurs, son actualité récente.",
    "Préparez des exemples concrets qui illustrent vos compétences et réalisations.",
    "Entraînez-vous à répondre aux questions classiques d'entretien avec une personne de confiance.",
  ],
  '5': [
    "Pendant l'entretien, écoutez attentivement et prenez le temps de réfléchir avant de répondre.",
    "N'hésitez pas à poser des questions sur le poste, l'équipe et l'entreprise.",
    "Adoptez une attitude positive et montrez votre motivation pour le poste.",
  ],
  '6': [
    "En cas de réponse positive, prenez le temps de bien négocier votre contrat avant d'accepter.",
    "En cas de refus, n'hésitez pas à demander un retour pour améliorer vos futures candidatures.",
    "Continuez vos recherches jusqu'à la signature d'un contrat, même si vous avez des pistes prometteuses.",
  ],
  '7': [
    "Lisez attentivement votre contrat avant de le signer et n'hésitez pas à poser des questions.",
    "Vérifiez que tous les éléments négociés sont bien présents dans le contrat écrit.",
    "Conservez une copie de tous les documents signés pour votre dossier personnel.",
  ],
  '8': [
    "Pendant la période d'essai, restez à l'écoute et demandez régulièrement des feedbacks.",
    "Prenez des notes lors de vos formations initiales pour faciliter votre intégration.",
    "N'hésitez pas à solliciter l'aide de vos collègues si vous avez des questions.",
  ],
  'default': [
    "Comment puis-je vous aider dans votre recherche d'emploi aujourd'hui ?",
    "N'hésitez pas à me poser des questions sur le processus de recherche d'emploi.",
    "Je suis là pour vous accompagner à chaque étape de votre parcours vers l'emploi.",
  ]
};

// Intelligence artificielle simplifiée pour le chatbot
const getAIResponse = (query: string, currentStep: string): {text: string, points: number} => {
  const queryLower = query.toLowerCase();
  
  const keywords = {
    'cv': {
      response: "Pour un CV efficace, mettez en avant vos compétences pertinentes, utilisez un format clair et faites-le relire par quelqu'un. Notre générateur de CV peut vous aider à créer un document professionnel.",
      points: 5
    },
    'lettre': {
      response: "Une bonne lettre de motivation doit être personnalisée pour chaque offre. Elle doit expliquer pourquoi vous êtes intéressé par le poste et l'entreprise, et comment vos compétences correspondent aux besoins.",
      points: 5
    },
    'entretien': {
      response: "Pour réussir un entretien, préparez-vous en recherchant l'entreprise, entraînez-vous aux questions courantes, et préparez vos propres questions. Soignez votre présentation et arrivez à l'heure le jour J.",
      points: 10
    },
    'salaire': {
      response: "Pour négocier votre salaire, renseignez-vous sur les rémunérations du marché pour votre poste et votre expérience. Mettez en avant vos compétences et expériences qui justifient votre demande.",
      points: 15
    },
    'linkedin': {
      response: "LinkedIn est un outil essentiel pour votre recherche d'emploi. Complétez votre profil à 100%, ajoutez une photo professionnelle et connectez-vous avec des personnes de votre secteur.",
      points: 5
    },
    'réseaux': {
      response: "Les réseaux professionnels sont très utiles pour trouver un emploi. Informez votre entourage de votre recherche, participez à des événements de networking et soyez actif sur les réseaux sociaux professionnels.",
      points: 5
    },
    'préparation': {
      response: "Pour bien vous préparer à chercher un emploi, définissez clairement votre projet professionnel, mettez à jour vos documents (CV, profils en ligne) et organisez votre temps de recherche.",
      points: 10
    },
    'questions': {
      response: "Lors d'un entretien, préparez des questions pertinentes sur le poste, l'équipe, la culture d'entreprise et les perspectives d'évolution. Cela montre votre intérêt pour l'entreprise.",
      points: 10
    },
    'refus': {
      response: "Face à un refus, demandez un retour pour comprendre les raisons et vous améliorer. Ne le prenez pas personnellement et restez positif pour vos prochaines candidatures.",
      points: 10
    },
    'période d\'essai': {
      response: "Pendant la période d'essai, soyez à l'écoute, demandez des feedbacks réguliers, et n'hésitez pas à poser des questions pour vous intégrer au mieux.",
      points: 10
    },
    'contrat': {
      response: "Avant de signer un contrat, vérifiez tous les éléments : salaire, avantages, horaires, missions, clause de non-concurrence, etc. N'hésitez pas à demander des clarifications si nécessaire.",
      points: 10
    },
    'candidature': {
      response: "Pour une candidature efficace, personnalisez votre CV et votre lettre pour chaque offre, mettez en avant les compétences demandées dans l'annonce, et suivez up après l'envoi.",
      points: 10
    },
    'merci': {
      response: "Je vous en prie ! C'est un plaisir de vous aider dans votre parcours vers l'emploi. N'hésitez pas si vous avez d'autres questions !",
      points: 2
    },
    'bonjour': {
      response: "Bonjour ! Comment puis-je vous aider aujourd'hui dans votre recherche d'emploi ?",
      points: 1
    },
    'aide': {
      response: "Je suis là pour vous aider ! Posez-moi des questions sur la rédaction de CV, la préparation aux entretiens, ou tout autre aspect de votre recherche d'emploi.",
      points: 2
    }
  };

  for (const [keyword, data] of Object.entries(keywords)) {
    if (queryLower.includes(keyword)) {
      return { text: data.response, points: data.points };
    }
  }

  const stepResponsesToUse = stepResponses[currentStep] || stepResponses['default'];
  const randomIndex = Math.floor(Math.random() * stepResponsesToUse.length);
  return { text: stepResponsesToUse[randomIndex], points: 1 };
};

// Niveaux et badges pour la gamification
const experienceLevels = [
  { level: 1, threshold: 0, title: "Débutant", icon: <Star className="text-yellow-500" /> },
  { level: 2, threshold: 20, title: "Apprenti", icon: <Zap className="text-blue-500" /> },
  { level: 3, threshold: 50, title: "Intermédiaire", icon: <Award className="text-purple-500" /> },
  { level: 4, threshold: 100, title: "Expert", icon: <Trophy className="text-orange-500" /> },
  { level: 5, threshold: 200, title: "Maître", icon: <Heart className="text-red-500" /> }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('chatbot_points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem('chatbot_position');
    return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isChatbotHidden, setIsChatbotHidden] = useState(() => {
    return localStorage.getItem('chatbot_hidden') === 'true';
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { stepId } = useParams<{ stepId: string }>();
  const { user } = useAuth();
  const currentStep = stepId || String(user?.currentStep || 'default');
  
  const isMobile = window.innerWidth < 768;

  const getCurrentLevel = () => {
    const level = experienceLevels.reduce((acc, level) => {
      if (points >= level.threshold) return level;
      return acc;
    }, experienceLevels[0]);
    return level;
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = experienceLevels.find(level => level.threshold > points) || currentLevel;
  const progressToNextLevel = nextLevel.threshold > currentLevel.threshold 
    ? Math.min(((points - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100, 100) 
    : 100;

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: "Bonjour ! Je suis votre coach emploi virtuel pour vous aider dans votre parcours. Comment puis-je vous aider aujourd'hui ?",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    localStorage.setItem('chatbot_points', points.toString());
  }, [points]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatbot_position', JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    localStorage.setItem('chatbot_hidden', String(isChatbotHidden));
  }, [isChatbotHidden]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    setIsDragging(true);
    const chatbotRect = chatbotRef.current?.getBoundingClientRect();
    if (chatbotRect) {
      setDragOffset({
        x: e.clientX - chatbotRect.left,
        y: e.clientY - chatbotRect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const chatbotWidth = chatbotRef.current?.offsetWidth || 0;
      const chatbotHeight = chatbotRef.current?.offsetHeight || 0;
      
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;
      
      newX = Math.max(0, Math.min(viewportWidth - chatbotWidth, newX));
      newY = Math.max(0, Math.min(viewportHeight - chatbotHeight, newY));
      
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = getAIResponse(inputValue, currentStep);
      
      if (response.points > 0) {
        setLastPoints(response.points);
        setPoints(prev => prev + response.points);
        setShowPointsAnimation(true);
        
        setTimeout(() => {
          setShowPointsAnimation(false);
        }, 2000);
        
        const prevLevel = getCurrentLevel().level;
        const newLevel = experienceLevels.reduce((acc, level) => {
          if (points + response.points >= level.threshold) return level;
          return acc;
        }, experienceLevels[0]);
        
        if (newLevel.level > prevLevel) {
          toast({
            title: "🎉 Niveau supérieur atteint !",
            description: `Vous êtes maintenant ${newLevel.title} en recherche d'emploi.`,
            variant: "default",
          });
        }
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChatbotVisibility = () => {
    setIsChatbotHidden(!isChatbotHidden);
    if (isChatbotHidden) {
      toast({
        title: "Assistant virtuel",
        description: "Votre assistant virtuel est à nouveau disponible.",
        variant: "default",
      });
    }
  };

  if (isMobile) {
    return (
      <>
        {showPointsAnimation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
            <div className="bg-primary text-white px-4 py-2 rounded-full text-xl font-bold">
              +{lastPoints} points !
            </div>
          </div>
        )}
        
        {!isChatbotHidden && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <Badge className="absolute -top-2 -right-2 bg-primary" variant="default">
                  {currentLevel.level}
                </Badge>
                <MessageCircle className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
              <DrawerHeader className="border-b p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DrawerTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Coach Emploi
                  </DrawerTitle>
                  <Badge variant="outline" className="ml-2 flex items-center gap-1">
                    {currentLevel.icon}
                    <span>{currentLevel.title}</span>
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => setIsChatbotHidden(true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerHeader>
              
              <div className="flex flex-col h-full">
                <div className="px-4 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Niveau {currentLevel.level}</span>
                    <span className="text-xs text-muted-foreground">
                      {points}/{nextLevel.threshold} points
                    </span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'bot' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === 'user' ? 'Vous' : 'Coach Emploi'}
                          </span>
                          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <DrawerFooter className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        
        {isChatbotHidden && (
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4 shadow-md"
            onClick={toggleChatbotVisibility}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Afficher l'assistant
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {showPointsAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-primary text-white px-4 py-2 rounded-full text-xl font-bold">
            +{lastPoints} points !
          </div>
        </div>
      )}
      
      {isChatbotHidden ? (
        <Button
          className="fixed bottom-4 right-4 shadow-md"
          variant="outline"
          onClick={toggleChatbotVisibility}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Afficher l'assistant
        </Button>
      ) : !isOpen ? (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform"
          onClick={() => setIsOpen(true)}
          style={{
            bottom: `${position.y}px`,
            right: `${position.x}px`,
            position: 'fixed',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          ref={chatbotRef}
          onMouseDown={handleMouseDown}
        >
          <Badge className="absolute -top-2 -right-2 bg-primary" variant="default">
            {currentLevel.level}
          </Badge>
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card
          className={`fixed shadow-lg transition-all duration-300 ${
            isMinimized ? 'w-72 h-16' : 'w-96 h-[500px]'
          } flex flex-col z-50`}
          style={{
            bottom: `${position.y}px`,
            right: `${position.x}px`,
            transform: isDragging ? 'scale(1.01)' : 'scale(1)',
            cursor: 'auto',
          }}
          ref={chatbotRef}
        >
          <CardHeader 
            className="p-3 border-b flex-shrink-0 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Move className="h-4 w-4 cursor-grab text-muted-foreground" />
                <Bot className="h-5 w-5 text-primary" />
                Coach Emploi
                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  {currentLevel.icon}
                  <span>{currentLevel.title}</span>
                </Badge>
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-700"
                  onClick={() => setIsChatbotHidden(true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {!isMinimized && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Niveau {currentLevel.level}</span>
                  <span className="text-xs text-muted-foreground">
                    {points}/{nextLevel.threshold} points
                  </span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
              </div>
            )}
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'bot' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === 'user' ? 'Vous' : 'Coach Emploi'}
                          </span>
                          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <div className="flex gap-2 w-full">
                  <Input
                    placeholder="Tapez votre message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Chatbot;
