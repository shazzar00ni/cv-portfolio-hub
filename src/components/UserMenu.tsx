
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';

interface UserMenuProps {
  session: Session | null;
}

const UserMenu = ({ session }: UserMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initials, setInitials] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      const email = session.user.email || '';
      setInitials(email.substring(0, 2).toUpperCase());
      
      // Fetch user profile if needed
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url, full_name')
            .eq('id', session.user.id)
            .single();
          
          if (data && !error) {
            setAvatarUrl(data.avatar_url);
            // If we have a full name, use its initials instead
            if (data.full_name) {
              const nameParts = data.full_name.split(' ');
              if (nameParts.length >= 2) {
                setInitials(`${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase());
              } else {
                setInitials(data.full_name.substring(0, 2).toUpperCase());
              }
            }
          }
        } catch (error) {
          console.log("Error fetching profile:", error);
        }
      };
      
      fetchProfile();
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <Button variant="outline" onClick={() => navigate('/auth')}>
        <User className="h-4 w-4 mr-2" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={avatarUrl || ''} alt="Profile" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
