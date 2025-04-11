
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel.",
      });
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une inscription
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          <CardDescription className="pt-4 text-center">
            Accédez à votre parcours personnalisé
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.fr" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a href="/forgot-password" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input id="email-register" type="email" placeholder="votre@email.fr" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Mot de passe</Label>
                  <Input id="password-register" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-muted-foreground">
          En vous connectant, vous acceptez nos{" "}
          <a href="/terms" className="text-primary hover:underline">
            conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy" className="text-primary hover:underline">
            politique de confidentialité
          </a>
          .
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
