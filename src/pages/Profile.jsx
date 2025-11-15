import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, Crown, Sparkles, Mail, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });
  
  const { data: progressList = [] } = useQuery({
    queryKey: ['gameProgress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return await base44.entities.GameProgress.filter({ created_by: user.email });
    },
    enabled: !!user?.email,
  });
  
  const progress = progressList[0] || {
    faith_points: 0,
    unlocked_filters: [],
    completed_levels: [],
    completed_tutorial: false
  };
  
  const updateProfileMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser']);
      toast.success('Profile updated successfully! 💜');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Failed to update profile');
    }
  });
  
  const handleSave = () => {
    if (!fullName.trim()) {
      toast.error('Please enter a name');
      return;
    }
    updateProfileMutation.mutate({ full_name: fullName });
  };
  
  const handleStartEdit = () => {
    setFullName(user?.full_name || '');
    setIsEditing(true);
  };
  
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-xl text-purple-900">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {user?.full_name || 'Angel Sister'}
          </h1>
          <p className="text-xl text-gray-700">{user?.email}</p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 text-center"
          >
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-purple-600" />
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {progress.faith_points}
            </div>
            <p className="text-gray-700 font-medium">Faith Points</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 text-center"
          >
            <Award className="w-10 h-10 mx-auto mb-3 text-pink-600" />
            <div className="text-4xl font-bold text-pink-600 mb-2">
              {progress.completed_levels?.length || 0}
            </div>
            <p className="text-gray-700 font-medium">Completed Levels</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 text-center"
          >
            <Crown className="w-10 h-10 mx-auto mb-3 text-blue-600" />
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {progress.unlocked_filters?.length || 0}
            </div>
            <p className="text-gray-700 font-medium">Unlocked Rewards</p>
          </motion.div>
        </div>
        
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-200"
        >
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Profile Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Full Name</p>
                {isEditing ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-900">
                    {user?.full_name || 'Not set'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(user?.created_date || Date.now()).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-purple-300"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={handleStartEdit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>
        
        {/* Unlocked Rewards */}
        {progress.unlocked_filters && progress.unlocked_filters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-2 border-purple-300"
          >
            <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Your Unlocked Rewards
            </h2>
            <div className="flex flex-wrap gap-3">
              {progress.unlocked_filters.map((filter, i) => (
                <div key={i} className="bg-white px-4 py-2 rounded-full border-2 border-purple-300 font-semibold text-purple-700">
                  ✨ {filter}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}