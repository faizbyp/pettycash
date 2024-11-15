# Petty Cash

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. Specify `.env.production` for the desired domain and keys.

2. Run the build command.

```bash
npm run build
```

3. Run `Dockerfile.arm` to create images based on the standalone build version and `.env.production` inside the directory.

```bash
docker buildx build --platform linux/arm64 -t faizbyp/pettycash:x.x.x -f Dockerfile.arm --load .
```

4. Test Locally

```bash
docker run -p 3000:3000 --env-file .env.production faizbyp/pettycash:x.x.x
```

5. Push the image to Docker Hub.

6. Ask the infra team to update the deployment image based on the updated tag on Docker Hub.

7. Update deployment log in `README.md`

## Deployment Log

### `1.0.1`

- update: report menu on admin
- feat: reset password
- feat: file validation
- perf: update order plan and conf pie chart
- perf: update company chart
- fix: font load on next js
- perf: memoize report chart component
- update: finance dashboard
- update: add money spent tooltip

### `1.0.2`

> ERROR ON DEPLOYMENT

### `1.0.3`

- update: remove /approval route
  already in /po
- update: list subheader color
- fix: isaxioserror import
- update: add is complete state on po table
- update: add file name validation
- update: router push to replace on new gr and po
- update: add reject notes on rejected po and gr
- update: company bar chart

### `1.0.4`

- feat: cancel po
- fix: cancel button only on approved
- update: add ppn value to pofooter
- feat: edit po fe
- update: add edit po button route
- fix: remove item index bug
- fix: remove added items index
- fix: order plan date
- fix: table map key
- fix: add edit po page restriction
- update: add po has gr status
- fix: cancel po restriction
- fix: watchgr import
- update: add confirmation button on po details

### `1.0.5`

- update: plan date on gr details
- update: component pages directory
- update: company orders to company spent
- update: add charts on user dashboard
- update: approval date on details
