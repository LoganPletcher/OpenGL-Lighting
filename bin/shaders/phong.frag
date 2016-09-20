// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

out vec4 FragColor;

uniform vec3 lightDirection;
uniform vec3 cameraPosition;
uniform float specularPower;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

void main()
{
	vec3 Lm = normalize(lightDirection);
	vec3 N = normalize(vNormal.xyz);

	vec3 grey = vec3(.25f,.25f,.25f);

	vec3 red = vec3(255,0,0);
	vec3 ylw = vec3(255,250,0);
	vec3 grn = vec3(0,255,0);
	vec3 cyn = vec3(0,255,255);
	vec3 blu = vec3(0,0,255);
	vec3 vlt = vec3(255,0,255);

	vec3 R = (2 * dot(Lm, N) * N - Lm);
	vec3 E = normalize(cameraPosition - vPosition.xyz);

	float specTerm = pow(max(0,dot(R, E)), specularPower);

	float a = dot(N,vec3(0,1.f,0));
	vec3 hemisphere = .5f * mix(blu, blu, a) + .5f;
	
	vec3 Ambient = (Ia * .01f) * (Ka) * hemisphere;
	vec3 Diffuse = Kd * dot(N,Lm) * Id * .5f;
	vec3 Specular = Ks * (Is) * specTerm;
	
	FragColor = vec4(Ambient + Diffuse + Specular, 1.f);
}