namespace Kankoreziai.Attributes.Authentication
{
    [System.AttributeUsage(System.AttributeTargets.Method, AllowMultiple = false)]
    public class RequiresAuthenticationAttribute : Attribute
    {
        public string[]? Permissions { get; }

        public RequiresAuthenticationAttribute() {
            Permissions = null;
        }
        public RequiresAuthenticationAttribute(params string[] permissions) {
            Permissions = permissions;
        }
    }
}
