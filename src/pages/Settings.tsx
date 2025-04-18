
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Bell, Eye, EyeOff, Loader2, Lock, Save, User } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Session } from '@supabase/supabase-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Notification settings (these would connect to a real backend in a full implementation)
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
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const saveNotificationSettings = () => {
    setSaving(true);
    
    // Simulate saving notification preferences
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated",
      });
    }, 1000);
    
    // In a real implementation, you would save these settings to your database
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setSaving(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      // Clear password fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    // This is just a placeholder - in a real app, you would need a more comprehensive flow
    // with confirmation, password verification, etc.
    toast({
      title: "Feature not implemented",
      description: "Account deletion is not available in this demo",
      variant: "destructive",
    });
  };

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

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="account" className="space-y-8">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
                <TabsTrigger value="account" className="text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="text-sm">
                  <Lock className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <div className="grid gap-6">
                  <AnimatedSection delay={100}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                          View and manage your account details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-muted-foreground">Email</Label>
                            <p className="font-medium">{session?.user?.email}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Account created</Label>
                            <p className="font-medium">
                              {new Date(session?.user?.created_at || Date.now()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div>
                          <Button onClick={() => navigate('/profile')} variant="outline">
                            <User className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                  
                  <AnimatedSection delay={200}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>
                          Permanent actions that cannot be undone
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Delete Account</AlertTitle>
                          <AlertDescription>
                            This will permanently delete your account and remove all your data.
                            This action cannot be undone.
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </Button>
                      </CardFooter>
                    </Card>
                  </AnimatedSection>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <AnimatedSection delay={100}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="current-password" 
                            type={showPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handlePasswordChange} 
                        disabled={saving || !newPassword || !confirmPassword}
                        className="ml-auto"
                      >
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Password
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              </TabsContent>
              
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
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Portfolio Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your portfolio items receive interaction
                          </p>
                        </div>
                        <Switch 
                          checked={portfolioUpdates}
                          onCheckedChange={setPortfolioUpdates}
                          disabled={!emailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
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
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={saveNotificationSettings} 
                        disabled={saving}
                        className="ml-auto"
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
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
