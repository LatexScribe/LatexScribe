package org.latexscribe.LatexScribe.webcontroller;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.TemplateDto;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.service.ITemplateService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/templates")
public class TemplateController {
    private final ITemplateService templateService;

    @GetMapping
    public List<DocumentTemplate> listAll() {
        return templateService.listAll();
    }

    @GetMapping("/my_templates")
    public List<DocumentTemplate> listAllByUser(User user) {
        return templateService.listAllByUser(user);
    }

    @GetMapping("/{category}")
    public List<DocumentTemplate> listAllByCategory(@PathVariable TemplateCategory category) {
        return templateService.listAllByCategory(category);
    }

    @GetMapping("/{id}")
    public DocumentTemplate getById(@PathVariable Long id) {
        Optional<DocumentTemplate> template = templateService.findById(id);
        if (template.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "template not found"
            );
        }
        return template.get();
    }

    @PostMapping
    public HttpStatus create(@RequestBody TemplateDto templateDto) {
        templateService.create(templateDto);
        return HttpStatus.OK;
    }


    @PutMapping("/{id}")
    public HttpStatus update(@PathVariable Long id, @RequestBody TemplateDto templateDto) {
        templateService.update(id, templateDto);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}")
    public HttpStatus delete(@PathVariable Long id) {
        templateService.delete(id);
        return HttpStatus.OK;
    }
}
