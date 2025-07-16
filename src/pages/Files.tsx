import { Files as FilesIcon, Upload, Download, Search, MoreVertical, FileText, Image, Video, Music, Archive, Eye, Trash2, Share } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const files = [
  {
    id: 1,
    name: 'Project Mockups.figma',
    type: 'design',
    size: '15.2 MB',
    sharedBy: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bc?w=150',
    sharedAt: '2 hours ago',
    icon: FileText,
    color: 'text-purple-500'
  },
  {
    id: 2,
    name: 'Team Photo.jpg',
    type: 'image',
    size: '2.1 MB',
    sharedBy: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    sharedAt: '1 day ago',
    icon: Image,
    color: 'text-blue-500'
  },
  {
    id: 3,
    name: 'Presentation.pptx',
    type: 'document',
    size: '8.5 MB',
    sharedBy: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    sharedAt: '2 days ago',
    icon: FileText,
    color: 'text-orange-500'
  },
  {
    id: 4,
    name: 'Demo Video.mp4',
    type: 'video',
    size: '45.8 MB',
    sharedBy: 'Design Team',
    avatar: '🎨',
    sharedAt: '3 days ago',
    icon: Video,
    color: 'text-red-500',
    isGroup: true
  },
  {
    id: 5,
    name: 'Background Music.mp3',
    type: 'audio',
    size: '5.2 MB',
    sharedBy: 'Mom',
    avatar: 'https://images.unsplash.com/photo-1543051932-6ef9fecfbc74?w=150',
    sharedAt: '1 week ago',
    icon: Music,
    color: 'text-green-500'
  },
  {
    id: 6,
    name: 'Project Archive.zip',
    type: 'archive',
    size: '128.5 MB',
    sharedBy: 'Jordan Betard',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    sharedAt: '1 week ago',
    icon: Archive,
    color: 'text-gray-500'
  }
];

const recentFiles = files.slice(0, 3);
const imageFiles = files.filter(file => file.type === 'image');
const documentFiles = files.filter(file => ['document', 'design'].includes(file.type));

const formatFileSize = (size: string) => size;

const Files = () => {
  return (
    <div className="h-screen gradient-main flex flex-col">
      {/* Header */}
      <div className="border-b border-chat-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FilesIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Files</h1>
          </div>
          <Button size="sm" className="gradient-primary shadow-glow">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-10 bg-chat-background border-chat-border focus:border-primary"
          />
        </div>
      </div>

      {/* Storage Usage */}
      <div className="p-6 border-b border-chat-border">
        <div className="bg-chat-background rounded-xl p-4 border border-chat-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Storage Used</span>
            <span className="text-sm text-muted-foreground">1.2 GB of 5 GB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="border-b border-chat-border px-6">
          <TabsList className="grid w-full grid-cols-4 bg-chat-background">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  {/* File Icon */}
                  <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${file.color}`}>
                    <file.icon className="h-6 w-6" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {file.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Shared by</span>
                      {file.isGroup ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded bg-gradient-primary flex items-center justify-center text-xs">
                            {file.avatar}
                          </div>
                          <span className="font-medium">{file.sharedBy}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={file.avatar} />
                            <AvatarFallback className="text-xs">
                              {file.sharedBy.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{file.sharedBy}</span>
                        </div>
                      )}
                      <span>•</span>
                      <span>{file.sharedAt}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 space-y-2">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${file.color}`}>
                    <file.icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {file.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Shared {file.sharedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground truncate mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {file.sharedAt}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="flex-1 overflow-y-auto m-0">
          <div className="p-4 space-y-2">
            {documentFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl bg-chat-background border border-chat-border hover:bg-chat-hover cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${file.color}`}>
                    <file.icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {file.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Modified {file.sharedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Files;