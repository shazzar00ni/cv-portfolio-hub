
import { Session } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@/hooks/use-profile';

interface ProfileHeaderProps {
  profile: Profile | null;
  session: Session | null;
}

const ProfileHeader = ({ profile, session }: ProfileHeaderProps) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile?.avatar_url || ''} alt="Profile" />
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
  );
};

export default ProfileHeader;
