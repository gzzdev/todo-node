###################################################
# Stage: base
# 
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
###################################################
FROM node:20 AS base
WORKDIR /usr/local/app

###################################################
################  BACKEND STAGES  #################
###################################################

###################################################
# Stage: backend-base
#
# This stage is used as the base for the backend-dev and test stages, since
# there are common steps needed for each.
###################################################
FROM base AS backend-dev
COPY backend/package.json ./
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn \
    yarn install
COPY backend/__tests__ ./__tests__
COPY backend/src ./src
CMD ["yarn", "dev"]

###################################################
# Stage: test
#
# This stage runs the tests on the backend. This is split into a separate
# stage to allow the final image to not have the test dependencies or test
# cases.
###################################################
FROM backend-dev AS test
RUN yarn test

###################################################
# Stage: final
#
# This stage is intended to be the final "production" image. It sets up the
# backend and copies the built client application from the client-build stage.
#
# It pulls the package.json and yarn.lock from the test stage to ensure that
# the tests run (without this, the test stage would simply be skipped).
###################################################
FROM base AS final
ENV NODE_ENV=production
COPY --from=test /usr/local/app/package.json ./
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn \
    yarn install --production 
COPY backend/src ./src
# COPY --from=client-build /usr/local/app/dist ./src/static
EXPOSE 3000
CMD ["node", "src/index.js"]