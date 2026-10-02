using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Projects.Any())
            {
                return;   // DB has been seeded
            }

            var projects = new Project[]
            {
                new Project { Title = "Azure Kubernetes Platform", Description = "Enterprise AKS cluster setup with CI/CD, monitoring, and automated scaling.", Technologies = "Azure, AKS, Terraform, Helm, CI/CD", Order = 1 },
                new Project { Title = "Microservices Backend", Description = "Scalable backend architecture using .NET, REST, gRPC and RabbitMQ.", Technologies = "C#, .NET, gRPC, RabbitMQ, PostgreSQL", Order = 2 },
                new Project { Title = "Portfolio Website", Description = "Personal portfolio built with React, Vite, Tailwind CSS, and a .NET Backend.", Technologies = "React, TypeScript, Tailwind, C#, PostgreSQL", Order = 3 }
            };

            foreach (Project p in projects)
            {
                context.Projects.Add(p);
            }
            context.SaveChanges();
        }
    }
}