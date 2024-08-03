# whyq_lunch_evaluation

evaluate weekly lunch to improve our lunch choice.

## Rough introductions

### Lunch list with evaluation points

1. Get Next week's Company's Lunch menus weekly, every Monday 9am(Batch)
2. Show next week's menu with evaluation points, points are 1.0 ~ 5.0
3. we can see comments in every lunch menus when user click the menu

### Ranking of Lunch

1. we can see overall ranking of lunch.

### Evaluate daily lunch

1. User can see today's lunch list
2. select the lunch
3. evaluate with comment. evaluate is 1.0~5.0 points

## Tech Stack

BackEnd: Node.js + TypeScript, Express framework  
FrontEnd: React.js  
Database: Cloud firestore  
Hosting: OVH Cloud VPS  
Batch: Selenium + Python

## Note of deploy to OVH Cloud VPS

1. Prepare nginx
   Nginx config: copy&paste nginx.conf's content to here

   ```
   sudo nano /etc/nginx/sites-available/whyq_lunch_evaluation
   sudo nginx -t
   sudo systemctl restart nginx
   ```

2. add env file and firestore config.
   add .env file to both /frontend and /backend  
   add /backend/config/whyq-lunch-evaluation-777f06764b4e.json

3. systemctrl start/stop command

```
npm run build
sudo systemctl stop frontend.service
sudo systemctl daemon-reload
sudo systemctl start frontend.service
sudo systemctl enable frontend.service
```

```
npm run build
sudo systemctl stop backend.service
sudo systemctl daemon-reload
sudo systemctl start backend.service
sudo systemctl enable backend.service
```
