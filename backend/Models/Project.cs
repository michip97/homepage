namespace backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Technologies { get; set; } // Comma separated or JSON string
        public string? ImageUrl { get; set; }
        public string? ProjectUrl { get; set; }
        public string? GithubUrl { get; set; }
        public int Order { get; set; }
    }
}