export const keelAnnotationsExp = {"keel.sh/policy": "all"}
export const keelAnnotationsDev = {"keel.sh/match-tag": "true", "keel.sh/policy": "all"}
export const keelAnnotationsProd = {"keel.sh/policy": "major"}

export const basicAuthAnnotation = {"traefik.ingress.kubernetes.io/router.middlewares": "kube-system-basic-auth@kubernetescrd"};
export const basicAuth2Annotation = {
  "ingress.kubernetes.io/auth-type": "basic",
  "ingress.kubernetes.io/auth-secret": "basic-auth"
}
