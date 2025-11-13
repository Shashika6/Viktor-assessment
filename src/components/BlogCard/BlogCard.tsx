import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import type { BlogPost } from "../../types/blog.types";
import { config } from "../../config/env";
import { styles } from "./styles";

interface BlogCardProps {
  post: BlogPost;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const imageUrl = post.cover?.url || config.defaultBlogImage;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `https://cms.viktor.ai${imageUrl}`;

  return (
    <Card sx={styles.card}>
      <CardMedia
        component="img"
        height="200"
        image={fullImageUrl}
        alt={post?.title}
      />

      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" component="h2" gutterBottom>
          {post?.title || "Untitled Post"}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {post?.excerpt || "Summary not available"}
        </Typography>

        <Box sx={styles.metaBox}>
          <Typography variant="caption" color="text.secondary">
            {post.author?.full_name || "Unknown Author"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            •
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(post?.publication_date || "")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
