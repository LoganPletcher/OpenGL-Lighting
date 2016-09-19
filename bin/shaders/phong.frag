// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

out vec4 FragColor;


uniform vec4 Ka = vec4(1,0,0,1);
uniform vec4 Kd = vec4(1,0,0,1);
uniform vec4 lightDirection;
uniform vec4 Ia = vec4(.25f,.25f,.25f,1);
uniform vec4 Id = vec4(1,1,1,1);

void main()
{
	vec4 red = vec4(250,0,0,1);
	vec4 blue = vec4(0,0,250,1);
	float a = dot(vNormal,vec4(0,1.f,0,1.f));
	vec4 hemisphere = .5f * mix(red, blue, a) + .5f;
	//float d = max(0,
	//dot( normalize(vNormal.xyz),
	//vec3(0,1,0) ) );
	vec4 grey = vec4(.25f,.25f,.25f,1.f);
	//vec4 NormNormal = normalize(vNormal);
	float NdL = dot(vNormal,-lightDirection);
	vec4 Diffuse = Id * Kd * NdL;
	vec4 Ambient = (Ia * .01f) * (Ka) * hemisphere;
	FragColor = vec4(Ambient + Diffuse);
}