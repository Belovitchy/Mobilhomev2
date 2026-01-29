namespace Application.UseCases.Links.UpdateLink;

public record UpdateLinkCommand(
    string Name,
    string Url
);
