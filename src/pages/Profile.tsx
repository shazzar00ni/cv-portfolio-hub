import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import { Session } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/use-profile';
import MetaTags from '@/components/MetaTags';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { profile, loading, updateProfile } = useProfile(session);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        if (profile) {
          setFullName(profile.full_name || '');
          setUsername(profile.username || '');
          setAvatarUrl(profile.avatar_url || '');
        }
      } else {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, profile]);

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      
      const { error } = await updateProfile({
        full_name: fullName,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
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
      <MetaTags 
        title="Your Profile | Shannon Lockett Portfolio"
        description="Manage your profile settings and personal information on Shannon Lockett's portfolio platform."
        keywords="profile settings, user profile, account management"
      />
      <HeaderWithThemeToggle />
      
      <main className="flex-1 py-12">
        <div className="container max-w-screen-lg mx-auto px-4">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and profile settings
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <AnimatedSection delay={100}>
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} alt="Profile" />
                        <AvatarFallback>
                          {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">
                      {profile?.full_name || session?.user?.email?.split('@')[0] || 'User'}
                    </CardTitle>
                    <CardDescription>
                      {session?.user?.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center text-muted-foreground text-sm">
                      <p>
                        <User className="inline-block mr-2 h-4 w-4" />
                        {profile?.username ? `@${profile.username}` : 'No username set'}
                      </p>
                      <p>Member since {new Date(session?.user?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="col-span-1 md:col-span-2">
              <AnimatedSection delay={200}>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={session?.user?.email || ''}
                        disabled
                        placeholder="Your email address"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email address cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input 
                        id="avatar" 
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleUpdateProfile} 
                      disabled={updating}
                      className="ml-auto"
                    >
                      {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
