package main

import (
	"log"

	"github.com/ajonesb/user-management-backend/internal/controllers"
	"github.com/ajonesb/user-management-backend/internal/middleware"
	"github.com/ajonesb/user-management-backend/internal/repositories"
	"github.com/ajonesb/user-management-backend/internal/services"
	"github.com/ajonesb/user-management-backend/pkg/config"
	"github.com/ajonesb/user-management-backend/pkg/database"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	db, err := database.Init(cfg)
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	r := gin.Default()

	// CORS middleware configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3001"} // Add your frontend URL here
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	corsConfig.AllowCredentials = true

	r.Use(cors.New(corsConfig))

	userRepository := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepository)
	authService := services.NewAuthService(userRepository, cfg.JWTSecret)

	userController := controllers.NewUserController(userService)
	authController := controllers.NewAuthController(authService)

	r.POST("/api/register", authController.Register)
	r.POST("/api/login", authController.Login)

	authorized := r.Group("/api")
	authorized.Use(middleware.AuthMiddleware(cfg))
	{
		authorized.GET("/users", userController.ListUsers)
		authorized.POST("/users", userController.CreateUser)
		authorized.GET("/users/:id", userController.GetUser)
		authorized.PUT("/users/:id", userController.UpdateUser)
		authorized.DELETE("/users/:id", userController.DeleteUser)
	}

	port := ":8081"

	r.Run(port)
}
