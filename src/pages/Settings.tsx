import { Settings as SettingsIcon, User, Bell, Shield, Palette, Moon, Sun, Globe, Download, Trash2, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="h-full gradient-main flex flex-col">
      {/* Header */}
      <div className="border-b border-chat-border p-6">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          
          {/* Profile Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </h2>
            
            <div className="p-4 rounded-xl bg-chat-background border border-chat-border">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary shadow-elegant">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">JB</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">John Brown</h3>
                  <p className="text-sm text-muted-foreground">john.brown@example.com</p>
                  <p className="text-xs text-muted-foreground mt-1">+1 (555) 123-4567</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-chat-border" />

          {/* Notifications */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="message-notifications" className="text-sm font-medium">
                    Message Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Get notified when you receive new messages</p>
                </div>
                <Switch id="message-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="group-notifications" className="text-sm font-medium">
                    Group Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Get notified for group messages</p>
                </div>
                <Switch id="group-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="call-notifications" className="text-sm font-medium">
                    Call Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">Get notified for incoming calls</p>
                </div>
                <Switch id="call-notifications" defaultChecked />
              </div>
            </div>
          </div>

          <Separator className="bg-chat-border" />

          {/* Appearance */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="dark-mode" className="text-sm font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch id="dark-mode" defaultChecked />
                  <Moon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="language" className="text-sm font-medium">
                    Language
                  </Label>
                  <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                </div>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-chat-border" />

          {/* Privacy & Security */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="read-receipts" className="text-sm font-medium">
                    Read Receipts
                  </Label>
                  <p className="text-xs text-muted-foreground">Let others know when you've read their messages</p>
                </div>
                <Switch id="read-receipts" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="last-seen" className="text-sm font-medium">
                    Last Seen
                  </Label>
                  <p className="text-xs text-muted-foreground">Show when you were last online</p>
                </div>
                <Switch id="last-seen" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label htmlFor="two-factor" className="text-sm font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-chat-border" />

          {/* Data & Storage */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data & Storage
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label className="text-sm font-medium">
                    Export Chat Data
                  </Label>
                  <p className="text-xs text-muted-foreground">Download your chat history</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-chat-background border border-chat-border">
                <div>
                  <Label className="text-sm font-medium">
                    Clear Cache
                  </Label>
                  <p className="text-xs text-muted-foreground">Free up storage space</p>
                </div>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-chat-border" />

          {/* Account Actions */}
          <div className="space-y-4 pb-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div>
                <Label className="text-sm font-medium text-destructive">
                  Sign Out
                </Label>
                <p className="text-xs text-muted-foreground">Sign out from your account</p>
              </div>
              <Button variant="destructive" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;