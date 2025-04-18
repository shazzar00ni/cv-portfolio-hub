
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Bell, Loader2, Save } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Session } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/use-profile';

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [saving, setSaving] = useState(false);
  const { profile, loading, updateProfile } = useProfile(session);
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [portfolioUpdates, setPortfolioUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const saveNotificationSettings = async () => {
    setSaving(true);
    
    try {
      // In a real app, you would save these to your database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWithThemeToggle />
      
      <main className="flex-1 py-12">
        <div className="container max-w-screen-lg mx-auto px-4">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </AnimatedSection>

          <Tabs defaultValue="notifications" className="space-y-8">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-1">
              <TabsTrigger value="notifications" className="text-sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications">
              <AnimatedSection delay={100}>
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications from our system
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Portfolio Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about your portfolio interactions
                        </p>
                      </div>
                      <Switch 
                        checked={portfolioUpdates}
                        onCheckedChange={setPortfolioUpdates}
                        disabled={!emailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive important security notifications
                        </p>
                      </div>
                      <Switch 
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                        disabled={!emailNotifications}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={saveNotificationSettings} 
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
