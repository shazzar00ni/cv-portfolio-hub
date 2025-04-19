
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import HeaderWithThemeToggle from '@/components/HeaderWithThemeToggle';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/use-profile';
import MetaTags from '@/components/MetaTags';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';

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
    setUpdating(true);
    
    try {
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
                <ProfileHeader profile={profile} session={session} />
              </AnimatedSection>
            </div>

            <div className="col-span-1 md:col-span-2">
              <AnimatedSection delay={200}>
                <ProfileForm
                  session={session}
                  fullName={fullName}
                  setFullName={setFullName}
                  username={username}
                  setUsername={setUsername}
                  avatarUrl={avatarUrl}
                  setAvatarUrl={setAvatarUrl}
                  updating={updating}
                  onUpdate={handleUpdateProfile}
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
