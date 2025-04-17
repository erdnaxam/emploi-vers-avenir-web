
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
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
const getAIResponse = (query: string, currentStep: string): string => {
  // Convertir la requête en minuscules pour faciliter la recherche
  const queryLower = query.toLowerCase();
  
  // Mots-clés et leurs réponses
  const keywords = {
    'cv': "Pour un CV efficace, mettez en avant vos compétences pertinentes, utilisez un format clair et faites-le relire par quelqu'un. Notre générateur de CV peut vous aider à créer un document professionnel.",
    'lettre': "Une bonne lettre de motivation doit être personnalisée pour chaque offre. Elle doit expliquer pourquoi vous êtes intéressé par le poste et l'entreprise, et comment vos compétences correspondent aux besoins.",
    'entretien': "Pour réussir un entretien, préparez-vous en recherchant l'entreprise, entraînez-vous aux questions courantes, et préparez vos propres questions. Soignez votre présentation et arrivez à l'heure le jour J.",
    'salaire': "Pour négocier votre salaire, renseignez-vous sur les rémunérations du marché pour votre poste et votre expérience. Mettez en avant vos compétences et expériences qui justifient votre demande.",
    'linkedin': "LinkedIn est un outil essentiel pour votre recherche d'emploi. Complétez votre profil à 100%, ajoutez une photo professionnelle et connectez-vous avec des personnes de votre secteur.",
    'réseaux': "Les réseaux professionnels sont très utiles pour trouver un emploi. Informez votre entourage de votre recherche, participez à des événements de networking et soyez actif sur les réseaux sociaux professionnels.",
    'préparation': "Pour bien vous préparer à chercher un emploi, définissez clairement votre projet professionnel, mettez à jour vos documents (CV, profils en ligne) et organisez votre temps de recherche.",
    'questions': "Lors d'un entretien, préparez des questions pertinentes sur le poste, l'équipe, la culture d'entreprise et les perspectives d'évolution. Cela montre votre intérêt pour l'entreprise.",
    'refus': "Face à un refus, demandez un retour pour comprendre les raisons et vous améliorer. Ne le prenez pas personnellement et restez positif pour vos prochaines candidatures.",
    'période d\'essai': "Pendant la période d'essai, soyez à l'écoute, demandez des feedbacks réguliers, et n'hésitez pas à poser des questions pour vous intégrer au mieux.",
    'contrat': "Avant de signer un contrat, vérifiez tous les éléments : salaire, avantages, horaires, missions, clause de non-concurrence, etc. N'hésitez pas à demander des clarifications si nécessaire.",
    'candidature': "Pour une candidature efficace, personnalisez votre CV et votre lettre pour chaque offre, mettez en avant les compétences demandées dans l'annonce, et suivez up après l'envoi."
  };

  // Recherche de mots-clés dans la question
  for (const [keyword, response] of Object.entries(keywords)) {
    if (queryLower.includes(keyword)) {
      return response;
    }
  }

  // Si aucun mot-clé n'est trouvé, utiliser une réponse basée sur l'étape actuelle
  const stepResponsesToUse = stepResponses[currentStep] || stepResponses['default'];
  const randomIndex = Math.floor(Math.random() * stepResponsesToUse.length);
  return stepResponsesToUse[randomIndex];
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { stepId } = useParams<{ stepId: string }>();
  const { user } = useAuth();
  const currentStep = stepId || String(user?.currentStep || 'default');
  
  const isMobile = window.innerWidth < 768;

  // Ajouter message de bienvenue au chargement
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: "Bonjour ! Je suis votre assistant virtuel pour vous aider dans votre parcours vers l'emploi. Comment puis-je vous aider aujourd'hui ?",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Auto-scroll vers le dernier message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Envoi de message
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simuler un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue, currentStep),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  // Gérer la touche Entrée
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Format de la date pour les messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Composant pour le contenu du chatbot
  const ChatbotContent = () => (
    <>
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
                  {message.sender === 'user' ? 'Vous' : 'Assistant'}
                </span>
                <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
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
      </div>
    </>
  );

  // Rendu pour mobile (utilise Drawer)
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Assistant virtuel</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col h-full">
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
                        {message.sender === 'user' ? 'Vous' : 'Assistant'}
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
          <DrawerFooter>
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
    );
  }

  // Rendu pour desktop
  return (
    <>
      {!isOpen ? (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card
          className={`fixed bottom-4 right-4 shadow-lg transition-all duration-300 ${
            isMinimized ? 'w-72 h-16' : 'w-96 h-[500px]'
          } flex flex-col z-50`}
        >
          <CardHeader className="p-3 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Assistant virtuel
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
              </div>
            </div>
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
                            {message.sender === 'user' ? 'Vous' : 'Assistant'}
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
