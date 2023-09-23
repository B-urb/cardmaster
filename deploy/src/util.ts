import {Namespace, Secret} from "@pulumi/kubernetes/core/v1";
import {interpolate} from "@pulumi/pulumi";

export function createGitlabSecret(username: string, token: string, name: string, namespace: Namespace): Secret {
  let secretData = {
    "auths":
        {
          "registry.gitlab.com":
              {"auth": Buffer.from(username + ":" + token).toString('base64')}
        }
  };
  let encodedSecret = Buffer.from(JSON.stringify(secretData)).toString('base64')
  const pullSecretName = interpolate`gitlab-pull-secret-${namespace.metadata.name}`;
  return new Secret(name, {
    metadata: {
      name: pullSecretName,
      namespace: namespace.metadata.name,
    },
    type: "kubernetes.io/dockerconfigjson",
    data: {
      ".dockerconfigjson": encodedSecret
    }
  });
}