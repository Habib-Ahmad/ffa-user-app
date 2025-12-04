import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, MailOpen } from "lucide-react";
import { messagesApi, Message } from "@/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export default function Messages() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadMessages();
    loadUnreadCount();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messagesApi.getMessages();
      setMessages(response.content);
    } catch (error) {
      toast.error("Failed to load messages");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const count = await messagesApi.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load unread count", error);
    }
  };

  const handleMarkAsRead = async (messageId: number) => {
    try {
      await messagesApi.markAsRead(messageId);
      loadMessages();
      loadUnreadCount();
    } catch (error) {
      toast.error("Failed to mark message as read");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("nav.messages")}</h1>
          <p className="text-muted-foreground">
            View your messages and notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive">{unreadCount} unread</Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-muted-foreground">
                You'll receive notifications here when there are updates on your
                applications
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors ${
                !message.read ? "border-primary" : ""
              }`}
              onClick={() => !message.read && handleMarkAsRead(message.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {message.read ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Mail className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <CardTitle className="text-base">
                        {message.senderName || `User #${message.senderId}`}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(message.createdAt, "MMM dd, yyyy hh:mm a")}
                      </p>
                    </div>
                  </div>
                  {!message.read && <Badge variant="default">New</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{message.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
