ARG NODE_VERSION
ARG SCRATCH_VERSION
FROM ${NODE_VERSION} as buildstage
WORKDIR /base

COPY ./package*.json ./
RUN npm install 

COPY ./nx.json ./
COPY ./workspace.json ./
COPY ./apps ./apps
COPY ./libs ./libs
COPY ./tsconfig* ./
COPY ./babel* ./

RUN npx nx affected:build --configuration=production --parallel --all

FROM ${NODE_VERSION} as servestage
ARG WORKINGDIR
WORKDIR ${WORKINGDIR}

ENV PROJECT_DIR ./apps/backups

COPY --from=buildstage /base/node_modules ./node_modules
COPY --from=buildstage /base/dist/${PROJECT_DIR} ./dist/${PROJECT_DIR}

ENTRYPOINT ["node" "./dist/${PROJECT_DIR}/main.js"]
