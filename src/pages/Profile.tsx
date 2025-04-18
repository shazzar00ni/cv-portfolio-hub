
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

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [initials, setInitials] = useState('');

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
      if (session) {
        fetchProfile(session);
      } else {
        setLoading(false);
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (session: Session) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          const email = session.user.email || '';
          setInitials(email.substring(0, 2).toUpperCase());
          
          // Handle first login case
          toast({
            title: "Welcome!",
            description: "Let's set up your profile.",
          });
        } else {
          throw error;
        }
      } else if (data) {
        setFullName(data.full_name || '');
        setUsername(data.username || '');
        setAvatarUrl(data.avatar_url || '');
        
        // Set initials from full name or email
        if (data.full_name) {
          const nameParts = data.full_name.split(' ');
          if (nameParts.length >= 2) {
            setInitials(`${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase());
          } else {
            setInitials(data.full_name.substring(0, 2).toUpperCase());
          }
        } else {
          const email = session.user.email || '';
          setInitials(email.substring(0, 2).toUpperCase());
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      
      if (!session) {
        throw new Error('No session');
      }

      const updates = {
        id: session.user.id,
        full_name: fullName,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { 
          onConflict: 'id'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
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

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWithThemeToggle />
      
      <main className="flex-1 py-12">
        <div className="container max-w-screen-lg mx-auto px-4">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and profile settings
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <AnimatedSection delay={100}>
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarUrl} alt="Profile" />
                          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-xl">
                        {fullName || session?.user?.email?.split('@')[0] || 'User'}
                      </CardTitle>
                      <CardDescription>
                        {session?.user?.email}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-center text-muted-foreground text-sm">
                        <p>
                          <User className="inline-block mr-2 h-4 w-4" />
                          {username ? `@${username}` : 'No username set'}
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
                        onClick={updateProfile} 
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
