# To-Do

1. [ ] Create custom VPC with public and private subnets – **1h**
2. [ ] Set up Internet Gateway, NAT Gateway, and correct Route Tables – **1h**
3. [ ] Create Security Groups for EKS, ECS, Valkey, Load Balancers – **30min**
4. [ ] Define IAM roles and policies for EKS, ECS, S3, CloudWatch, etc. – **30min**
5. [ ] Launch EKS cluster using `eksctl`, configure `kubectl` and `helm` locally – **1h**
6. [ ] Write Dockerfile for the WebSocket Server (port 3000) – **30min**
7. [ ] Push WebSocket Server image to Amazon ECR – **20min**
8. [ ] Create Deployment and Service for WebSocket on EKS – **40min**
9. [ ] Configure Network Load Balancer (NLB) for EKS WebSocket exposure – **40min**
10. [ ] Test WebSocket connection through NLB public IP or DNS – **15min**
11. [ ] Refactor WebSocket server to use Valkey with `socket.io-redis` adapter – **1h**
12. [ ] Launch Valkey cluster in Amazon ElastiCache – **20min**
13. [ ] Configure Valkey endpoint on both WebSocket Server and Proxy – **30min**
14. [ ] Write Dockerfile for HTTP Proxy (port 4000) – **30min**
15. [ ] Push Proxy image to Amazon ECR – **20min**
16. [ ] Deploy Proxy on ECS using Fargate – **45min**
17. [ ] Create ALB (Application Load Balancer) for Proxy access – **40min**
18. [ ] Add health checks and path-based routing on ALB – **20min**
19. [ ] Point frontend app to Proxy endpoint (env variable or `.env`) – **15min**
20. [ ] Build React app with Vite (`vite build`) – **10min**
21. [ ] Upload frontend to S3 bucket – **10min**
22. [ ] Configure S3 bucket as static website with public access – **10min**
23. [ ] Create CloudFront distribution for the S3 frontend – **20min**
24. [ ] Configure custom domain in Route 53 for frontend – **20min**
25. [ ] Issue SSL/TLS cert with AWS Certificate Manager (ACM) – **15min**
26. [ ] Attach ACM certificate to CloudFront – **10min**
27. [ ] Add Web Application Firewall (WAF) to CloudFront – **30min**
28. [ ] Enable AWS Shield Standard (auto-enabled) or set up Shield Advanced if needed – **10min**
29. [ ] Configure CloudWatch for ECS, EKS, Valkey monitoring and logs – **30min**
30. [ ] Set up alarms and metrics (CPU, memory, connection errors) – **30min**
31. [ ] Create IAM roles for CloudWatch and grant service permissions – **20min**
32. [ ] Create fallback/error handler with AWS Lambda (for API/Proxy failures) – **40min**
33. [ ] Set up SNS topic for critical failures (panic mode) – **15min**
34. [ ] Add SQS queue to handle message buffering during traffic spikes – **30min**
35. [ ] Optionally connect DynamoDB for scalable message/session storage – **45min**
36. [ ] Configure CloudTrail to log all actions, IAM changes, and access – **30min**
37. [ ] Perform full test: chat flow (frontend → proxy → WebSocket) – **30min**
38. [ ] Stress test with multiple connections and message bursts – **30min**
39. [ ] Document infrastructure (README, diagram, cost breakdown) – **1h**
40. [ ] Final security audit and IAM least privilege review – **1h**

---

✅ Total estimated time: ~ **15h 45min**

> You can adjust based on your team size, prior AWS experience, or automation tools (like Terraform or CDK).
