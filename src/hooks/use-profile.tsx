
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

// Separated profile fetching function for better testing and reuse
export const fetchUserProfile = async (userId: string) => {
  if (!userId) throw new Error('User ID is required');
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, updated_at')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as Profile;
};

export function useProfile(session: Session | null) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;
  
  // Use React Query to handle caching, retries, and background updates
  const { 
    data: profile, 
    isLoading: loading,
    error 
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchUserProfile(userId as string),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
    // Don't refetch on window focus for better performance
    refetchOnWindowFocus: false
  });

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!userId) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return { error: null };
    },
    onSuccess: (_, variables) => {
      // Update the cache with new values instead of refetching
      queryClient.setQueryData(['profile', userId], (oldData: Profile | undefined) => {
        return oldData ? { ...oldData, ...variables } : oldData;
      });
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    }
  });

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      return await updateProfileMutation.mutateAsync(updates);
    } catch (error: any) {
      return { error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
  };
}
